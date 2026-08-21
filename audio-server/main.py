import os
import io
import json
import asyncio
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydub import AudioSegment
import tempfile

# Initialize FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# In a real environment, you would load Pyannote and Groq clients here.
# For example:
# from pyannote.audio import Pipeline
# pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=HF_TOKEN)
# from groq import Groq
# groq_client = Groq(api_key=GROQ_API_KEY)

# To ensure this runs out-of-the-box for the user without immediately crashing due to missing heavy dependencies or API keys, 
# we've structured the pipeline logic completely, but conditionally run mock processing if keys are missing.
HAS_KEYS = bool(HF_TOKEN and GROQ_API_KEY)

if HAS_KEYS:
    try:
        from pyannote.audio import Pipeline
        import torch
        from groq import Groq
        print("Initializing AI Models... This may take a minute.")
        pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=HF_TOKEN)
        
        # Move to GPU if available
        if torch.cuda.is_available():
            pipeline.to(torch.device("cuda"))
            
        groq_client = Groq(api_key=GROQ_API_KEY)
        print("AI Models Initialized Successfully.")
    except ImportError as e:
        print(f"Warning: Missing dependencies for true AI execution. {e}")
        HAS_KEYS = False

class SessionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = SessionManager()

def process_audio_chunk(audio_file_path: str, full_transcript_history: str):
    """
    Core Implementation of Approach 1: Two-Stage Pipeline (ASR + Dedicated Diarization)
    """
    if not HAS_KEYS:
        # Mock processing logic for testing UI without heavy AI models
        import time
        time.sleep(1)
        mock_transcript = "Patient: I've been having these headaches.\nDoctor: How often do they occur?"
        mock_insights = {
            "medicines": ["Ibuprofen 400mg"],
            "tests": ["MRI Brain (Optional)", "Blood Pressure check"]
        }
        return {
            "type": "transcription_update",
            "data": [
                {"id": str(time.time()), "speaker": "patient", "text": "I've been having these headaches.", "timestamp": datetime.now().strftime("%I:%M %p")},
                {"id": str(time.time()+1), "speaker": "doctor", "text": "How often do they occur?", "timestamp": datetime.now().strftime("%I:%M %p")}
            ],
            "insights": mock_insights
        }

    # 1. Groq Whisper for blazing fast transcription (ASR)
    with open(audio_file_path, "rb") as file:
        transcription = groq_client.audio.transcriptions.create(
            file=(audio_file_path, file.read()),
            model="whisper-large-v3",
            response_format="verbose_json", # Need timestamps
        )
    
    # 2. Pyannote for Diarization
    diarization = pipeline(audio_file_path)
    
    # 3. Alignment (mapping Whisper words/segments to Pyannote speaker intervals)
    # Simplified mapping logic for demo: we align based on segment overlaps
    speaker_segments = []
    for segment, _, speaker in diarization.itertracks(yield_label=True):
        speaker_segments.append({
            "start": segment.start,
            "end": segment.end,
            "speaker_label": speaker,
            "text": ""
        })
        
    for word_seg in transcription.segments:
        w_start = word_seg['start']
        # Find which speaker was speaking at w_start
        for spk_seg in speaker_segments:
            if spk_seg['start'] <= w_start <= spk_seg['end']:
                spk_seg['text'] += word_seg['text'] + " "
                break
                
    # Filter out empty segments
    speaker_segments = [s for s in speaker_segments if s['text'].strip()]
    
    # 4. LLM Role Assignment & Medical Insights (Groq Llama 3)
    # We ask the LLM to classify the speakers and extract medicines/tests
    prompt = f"""
    Analyze the following conversational transcript snippet between two speakers: SPEAKER_00 and SPEAKER_01.
    Task 1: Identify which speaker is the Doctor and which is the Patient based on conversational markers.
    Task 2: Extract any recommended medicines or medical tests mentioned in this snippet or the history.
    
    Transcript History: {full_transcript_history}
    New Snippet:
    {json.dumps([{"speaker": s["speaker_label"], "text": s["text"]} for s in speaker_segments])}
    
    Respond STRICTLY in JSON format:
    {{
        "speaker_roles": {{"SPEAKER_00": "doctor" or "patient", "SPEAKER_01": "doctor" or "patient"}},
        "medicines": ["med1", "med2"],
        "tests": ["test1", "test2"]
    }}
    """
    
    chat_completion = groq_client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a clinical AI assistant. Always output valid JSON."},
            {"role": "user", "content": prompt}
        ],
        model="llama3-8b-8192",
        response_format={"type": "json_object"}
    )
    
    llm_result = json.loads(chat_completion.choices[0].message.content)
    speaker_roles = llm_result.get("speaker_roles", {})
    
    # Format final output
    final_messages = []
    for s in speaker_segments:
        role = speaker_roles.get(s["speaker_label"], "unknown")
        # Default fallback if LLM fails
        if role not in ["doctor", "patient"]:
            role = "patient"
            
        final_messages.append({
            "id": f"{s['start']}-{s['end']}",
            "speaker": role,
            "text": s["text"].strip(),
            "timestamp": datetime.now().strftime("%I:%M %p")
        })
        
    return {
        "type": "transcription_update",
        "data": final_messages,
        "insights": {
            "medicines": llm_result.get("medicines", []),
            "tests": llm_result.get("tests", [])
        }
    }


@app.websocket("/ws/session")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    full_history = ""
    
    try:
        audio_buffer = io.BytesIO()
        chunk_count = 0
        
        while True:
            # Receive audio chunk (binary) from client
            data = await websocket.receive_bytes()
            audio_buffer.write(data)
            chunk_count += 1
            
            # Process every N chunks (e.g., approx 5-10 seconds of audio)
            if chunk_count >= 5:
                # Save buffer to a temporary wav file
                audio_buffer.seek(0)
                try:
                    # Depending on how the browser sends the audio (webm/ogg), we use pydub to convert it
                    audio = AudioSegment.from_file(audio_buffer)
                    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_wav:
                        audio.export(temp_wav.name, format="wav")
                        temp_wav_path = temp_wav.name
                        
                    # Run the Two-Stage Pipeline
                    result = process_audio_chunk(temp_wav_path, full_history)
                    
                    # Update history
                    for msg in result["data"]:
                        full_history += f"{msg['speaker']}: {msg['text']}\n"
                        
                    # Send results back to UI
                    await websocket.send_json(result)
                    
                    # Cleanup
                    os.remove(temp_wav_path)
                except Exception as e:
                    print(f"Error processing audio chunk: {e}")
                    
                # Reset buffer
                audio_buffer = io.BytesIO()
                chunk_count = 0
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
