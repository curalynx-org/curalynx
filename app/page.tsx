import { ArrowUpRight, CheckCircle2, ChevronRight, Mic, Play, Sparkles, Activity, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans text-[#18181A] selection:bg-[#E9D5FF] selection:text-[#18181A] overflow-hidden">
      
      {/* --- HERO SECTION (CREAM) --- */}
      <section className="bg-[#FDFBF2] min-h-screen relative flex flex-col items-center pt-8 pb-16 px-6 overflow-hidden">
        
        {/* Navbar */}
        <nav className="w-full max-w-[1200px] mx-auto bg-transparent border border-[#18181A]/20 rounded-xl px-4 py-3 flex items-center justify-between relative z-50 shadow-sm">
          <div className="flex items-center gap-2 pr-8 border-r border-[#18181A]/10">
            <Activity className="h-5 w-5 text-[#18181A]" />
            <span className="font-bold text-xl tracking-tighter">CuraLynx</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#18181A]">
            <Link href="#product" className="hover:opacity-70 transition-opacity flex items-center gap-1">Product <ChevronRight className="h-3 w-3 rotate-90 opacity-50"/></Link>
            <Link href="#individuals" className="hover:opacity-70 transition-opacity flex items-center gap-1">Individuals <ChevronRight className="h-3 w-3 rotate-90 opacity-50"/></Link>
            <Link href="#business" className="hover:opacity-70 transition-opacity">Business</Link>
            <Link href="#resources" className="hover:opacity-70 transition-opacity flex items-center gap-1">Resources <ChevronRight className="h-3 w-3 rotate-90 opacity-50"/></Link>
            <Link href="#company" className="hover:opacity-70 transition-opacity flex items-center gap-1">Company <ChevronRight className="h-3 w-3 rotate-90 opacity-50"/></Link>
          </div>
          
          <div className="flex items-center gap-4 border-l border-[#18181A]/10 pl-8">
            <Link href="/dashboard" className="text-[13px] font-bold text-[#18181A] hover:opacity-70 transition-opacity">
              Dashboard
            </Link>
            <Link href="/session" className="bg-[#E9D5FF] border border-[#18181A] hover:bg-[#D8B4FE] text-[#18181A] px-5 py-2 rounded-lg text-[13px] font-bold transition-colors">
              Live demo
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center relative z-20 max-w-4xl mx-auto mt-24 flex flex-col items-center pb-32">
          <h1 className="font-serif text-[60px] md:text-[90px] lg:text-[110px] leading-[1] tracking-tight text-[#18181A]">
            Don't type, <span className="italic">just speak</span>
          </h1>
          <p className="mt-8 text-[18px] md:text-[22px] text-[#18181A]/60 max-w-2xl mx-auto leading-relaxed font-serif tracking-wide">
            The clinical AI that turns your patient consultations into <br className="hidden md:block"/>
            <span className="text-[#18181A] font-medium">structured SOAP notes</span> and <span className="text-[#18181A] font-medium">ready-to-sign prescriptions.</span>
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-4 z-30 relative pointer-events-auto">
            <Link href="/session" className="bg-[#E9D5FF] border border-[#18181A] hover:bg-[#D8B4FE] text-[#18181A] px-8 py-3.5 rounded-full text-[15px] font-bold transition-all hover:scale-105 shadow-sm inline-block">
              Live demo
            </Link>
            <Link href="/dashboard" className="bg-[#FDFBF2] border border-[#18181A] hover:bg-[#18181A]/5 text-[#18181A] px-8 py-3.5 rounded-full text-[15px] font-bold transition-all hover:scale-105 shadow-sm inline-block">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Thread Text SVG */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <path id="ribbonPath1" d="M -100 400 C 100 300, 150 200, 200 300 C 250 400, 100 500, -100 400" />
              <path id="ribbonPath2" d="M -10 500 Q 400 700 700 700 T 1500 550" />
              <path id="ribbonPath3" d="M 700 700 Q 1100 700 1500 550" />
            </defs>
            
            {/* Light gray looping text on the left */}
            <text className="text-[15px] fill-[#18181A]/40 font-medium tracking-wide">
              <textPath href="#ribbonPath1" startOffset="0%">
                patient presented with a mild cough and some fatigue over the last few days, going to handle the first part of the
              </textPath>
            </text>
            <text className="text-[15px] fill-[#18181A]/40 font-medium tracking-wide">
              <textPath href="#ribbonPath2" startOffset="0%">
                assessment was really good and I think their vitals are stable. Also, I told the team that the new treatment plan
              </textPath>
            </text>

            {/* Black solid ribbon on the right simulating the processed text */}
            <path d="M 700 710 Q 1100 710 1500 560 L 1500 510 Q 1100 660 700 660 Z" fill="#18181A" />
            <text className="text-[15px] fill-white font-bold tracking-wide">
              <textPath href="#ribbonPath3" startOffset="3%">
                vitals are stable. Prescribed amoxicillin 500mg. Follow up in two weeks.
              </textPath>
            </text>

            {/* The Integrated Pill - Perfectly pinned to x=700 */}
            <foreignObject x="640" y="660" width="120" height="50">
              <div className="w-full h-full flex items-center justify-center pointer-events-auto">
                <div className="bg-[#FDFBF2] border border-[#18181A] px-4 py-2.5 rounded-full flex items-center shadow-md scale-90 md:scale-100">
                  <Mic className="h-4 w-4 md:h-5 md:w-5 text-[#18181A]" />
                  <div className="ml-2 flex gap-[2px] md:gap-[3px] h-3 md:h-4 items-center">
                    <span className="w-[1.5px] md:w-[2px] h-[40%] bg-[#18181A] rounded-full animate-pulse"></span>
                    <span className="w-[1.5px] md:w-[2px] h-[100%] bg-[#18181A] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-[1.5px] md:w-[2px] h-[60%] bg-[#18181A] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    <span className="w-[1.5px] md:w-[2px] h-[80%] bg-[#18181A] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-[1.5px] md:w-[2px] h-[50%] bg-[#18181A] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                    <span className="w-[1.5px] md:w-[2px] h-[90%] bg-[#18181A] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                  </div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </section>

      {/* --- CROSS-PLATFORM SECTION (DARK) --- */}
      <section className="bg-[#18181A] text-white py-32 px-6 rounded-t-[40px] md:rounded-t-[80px] -mt-10 relative z-20 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-bold uppercase tracking-widest mb-10">
            <span>Mac</span> <span className="opacity-40">•</span> <span>Windows</span> <span className="opacity-40">•</span> <span>iOS & Android</span>
          </div>
          
          <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.1] tracking-tight mb-6">
            Seamlessly integrates with <br className="hidden md:block"/> your EHR, anywhere.
          </h2>
          <p className="text-[#FDFBF2]/60 text-base max-w-xl mx-auto">
            Universal compatibility across all major medical software. If you can click it, CuraLynx can type in it.
          </p>
          
          <div className="mt-10">
            <Link href="#integration" className="bg-white hover:bg-zinc-200 text-[#18181A] px-6 py-3 rounded-full text-[13px] font-bold transition-colors">
              See all integrations
            </Link>
          </div>
        </div>

        {/* Floating Icons Representation */}
        <div className="mt-20 relative h-[300px] max-w-5xl mx-auto">
          {/* Mockup of a window/phone */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[350px] bg-black border border-white/10 rounded-t-3xl p-4 flex flex-col items-center">
             <div className="w-10 h-1 bg-white/20 rounded-full mb-8"></div>
             <Activity className="h-12 w-12 text-[#E9D5FF] mb-4" />
             <span className="text-white/40 text-xs font-medium">Recording consultation...</span>
          </div>
          
          {/* Floating 'Apps' */}
          <div className="absolute top-10 left-10 w-12 h-12 bg-blue-500 rounded-2xl rotate-[-10deg] flex items-center justify-center shadow-lg"><FileText className="text-white h-6 w-6"/></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-emerald-500 rounded-2xl rotate-[15deg] flex items-center justify-center shadow-lg"><Activity className="text-white h-8 w-8"/></div>
          <div className="absolute bottom-20 left-1/4 w-14 h-14 bg-red-500 rounded-3xl rotate-[5deg] flex items-center justify-center shadow-lg"><CheckCircle2 className="text-white h-7 w-7"/></div>
          <div className="absolute top-5 right-1/4 w-10 h-10 bg-purple-500 rounded-xl rotate-[-20deg] flex items-center justify-center shadow-lg"></div>
        </div>
      </section>

      {/* --- TRUST BANNER (GREEN) --- */}
      <section className="bg-[#0B392A] py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-white/80 text-[13px] font-medium tracking-wide uppercase max-w-[200px]">
             Trusted by forward-thinking clinics globally
           </p>
           <div className="flex gap-8 md:gap-16 items-center flex-wrap justify-center opacity-60 mix-blend-screen text-white font-serif text-2xl font-bold">
             <span>MayoClinic</span>
             <span>Cleveland</span>
             <span>JohnsHopkins</span>
             <span>StanfordMed</span>
             <span>MassGen</span>
           </div>
        </div>
      </section>

      {/* --- SPEED COMPARISON (CREAM) --- */}
      <section className="bg-[#FDFBF2] py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-[48px] md:text-[72px] leading-[1.1] tracking-tight text-[#18181A] mb-6">
            Save 2+ hours <br className="hidden md:block"/> every day
          </h2>
          <p className="text-[#18181A]/70 text-base max-w-2xl mx-auto mb-12">
            Stop sacrificing your evenings to catch up on charts. Our real-time AI structures the note while you speak, so you can lock the chart before the patient leaves the room.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-16">
            <Link href="/demo" className="border border-[#18181A]/20 hover:bg-[#18181A]/5 text-[#18181A] px-6 py-3 rounded-full text-[13px] font-bold transition-colors flex items-center gap-2">
              <Play className="h-4 w-4" /> Watch Demo
            </Link>
            <Link href="/session" className="bg-[#E9D5FF] hover:bg-[#D8B4FE] text-[#18181A] px-6 py-3 rounded-full text-[13px] font-bold transition-colors">
              Get Started
            </Link>
          </div>

          {/* Large Video/Image Placeholder */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-200 rounded-3xl overflow-hidden shadow-2xl">
            {/* Replace with actual image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-90"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Speed Comparison Overlays */}
            <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-24 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-white/40 flex flex-col items-center">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Typing</span>
              <span className="text-4xl font-serif text-[#18181A]">45 <span className="text-xl font-sans text-zinc-400">wpm</span></span>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-24 bg-[#0B392A]/90 backdrop-blur p-6 rounded-2xl shadow-lg border border-[#0B392A]/40 flex flex-col items-center text-white">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">CuraLynx</span>
              <span className="text-4xl font-serif">150+ <span className="text-xl font-sans text-emerald-200/50">wpm</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* --- WORKFLOW / GRID SECTION (DARK / ALTERNATING) --- */}
      <section className="bg-[#18181A] text-white py-32 px-6 rounded-t-[40px] md:rounded-t-[80px] -mt-10 relative z-20">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Main feature block */}
          <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
            <div className="flex-1">
              <h2 className="font-serif text-[48px] md:text-[64px] leading-[1.1] tracking-tight mb-6">
                Built for the <br/> way <span className="italic text-[#E9D5FF]">you work</span>
              </h2>
              <p className="text-[#FDFBF2]/60 text-lg mb-8">
                CuraLynx adapts to your style, not the other way around. 
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold">SOAP Notes</span>
                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold">Referrals</span>
                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold">Follow-ups</span>
                <span className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold">Rx Generation</span>
              </div>
            </div>
            
            <div className="flex-1 relative">
               <div className="w-full aspect-square bg-[#0B392A] rounded-full absolute -top-10 -right-10 opacity-50 blur-3xl"></div>
               <div className="bg-[#212124] border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="h-12 w-12 rounded-full bg-[#E9D5FF] flex items-center justify-center"><Activity className="text-[#18181A] h-6 w-6"/></div>
                   <div>
                     <p className="font-bold text-sm">One Tool. Any Workflow.</p>
                     <p className="text-xs text-white/40">Say "Start Subjective" and it listens.</p>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
                   <div className="h-4 w-full bg-white/5 rounded-full"></div>
                   <div className="h-4 w-5/6 bg-white/5 rounded-full"></div>
                   <div className="h-4 w-1/2 bg-white/5 rounded-full"></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Alternating Grid Features */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full aspect-[4/3] bg-[#FDFBF2] rounded-3xl mb-8 overflow-hidden relative border border-white/10 flex items-center justify-center p-8">
                {/* Visual */}
                <div className="bg-white rounded-xl shadow-xl w-full h-full p-4 flex flex-col">
                  <div className="h-3 w-1/4 bg-zinc-200 rounded-full mb-4"></div>
                  <div className="space-y-2 mb-auto">
                    <div className="h-2 w-full bg-zinc-100 rounded-full"></div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-zinc-100 rounded-full"></div>
                  </div>
                  <div className="bg-[#E9D5FF]/20 text-[#18181A] text-[10px] font-bold p-3 rounded-lg border border-[#E9D5FF]">
                    <Sparkles className="h-3 w-3 inline mr-1 text-purple-500" /> AI automatically structures the narrative into SOAP format.
                  </div>
                </div>
              </div>
              <h3 className="font-serif text-3xl mb-3">Instant SOAP Notes</h3>
              <p className="text-white/60 text-sm max-w-sm">Never manually categorize subjective vs objective again. Our NLP engine perfectly structures the conversation.</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center md:mt-24">
              <div className="w-full aspect-[4/3] bg-[#0B392A] rounded-3xl mb-8 overflow-hidden relative border border-white/10 flex items-center justify-center p-8">
                {/* Visual */}
                <div className="bg-[#18181A] rounded-xl shadow-xl w-full h-full p-6 flex flex-col gap-3 relative">
                  <span className="text-xs font-bold text-white/50 text-left mb-2">Medical Vocabulary</span>
                  <div className="bg-white/5 p-3 rounded-lg text-left text-xs font-medium text-emerald-400">Echocardiogram shows EF 55%</div>
                  <div className="bg-white/5 p-3 rounded-lg text-left text-xs font-medium text-emerald-400">Patient prescribed Lisinopril 10mg</div>
                  <div className="bg-white/5 p-3 rounded-lg text-left text-xs font-medium text-emerald-400">Diagnosis: HTN, hyperlipidemia</div>
                </div>
              </div>
              <h3 className="font-serif text-3xl mb-3">Advanced Vocabulary</h3>
              <p className="text-white/60 text-sm max-w-sm">Pre-trained on billions of clinical data points to understand complex medical terminology flawlessly.</p>
            </div>

             {/* Feature 3 */}
             <div className="flex flex-col items-center text-center">
              <div className="w-full aspect-[4/3] bg-[#212124] rounded-3xl mb-8 overflow-hidden relative border border-white/10 flex items-center justify-center p-8">
                {/* Visual */}
                <div className="text-center font-serif text-[80px] text-white/10 font-bold leading-none mt-10">
                  Rx.
                </div>
              </div>
              <h3 className="font-serif text-3xl mb-3">Smart Prescriptions</h3>
              <p className="text-white/60 text-sm max-w-sm">Automatically extract medication mentions and format them into ready-to-review prescriptions.</p>
            </div>

             {/* Feature 4 */}
             <div className="flex flex-col items-center text-center md:mt-24">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-indigo-900 to-[#18181A] rounded-3xl mb-8 overflow-hidden relative border border-white/10 flex items-center justify-center p-8">
                <div className="text-center">
                  <span className="font-serif text-[60px] text-white block leading-none">15+</span>
                  <span className="text-[14px] font-bold text-white/60 tracking-widest uppercase">Languages</span>
                </div>
              </div>
              <h3 className="font-serif text-3xl mb-3">Global Translation</h3>
              <p className="text-white/60 text-sm max-w-sm">Conduct consultations in Spanish, Hindi, or Mandarin, and instantly generate English clinical notes.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVAILABILITY BANNER (LAVENDER) --- */}
      <section className="bg-[#E9D5FF] py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
           <div className="flex gap-4 mb-6 opacity-60 text-[#18181A]">
             {/* Platform Icons placeholder */}
             <div className="h-10 w-10 bg-[#18181A] rounded-lg text-white flex items-center justify-center text-xs font-bold">Mac</div>
             <div className="h-10 w-10 bg-[#18181A] rounded-lg text-white flex items-center justify-center text-xs font-bold">Win</div>
             <div className="h-10 w-10 bg-[#18181A] rounded-lg text-white flex items-center justify-center text-xs font-bold">iOS</div>
             <div className="h-10 w-10 bg-[#18181A] rounded-lg text-white flex items-center justify-center text-xs font-bold">And</div>
           </div>
           <h2 className="font-serif text-[32px] md:text-[48px] leading-tight text-[#18181A] mb-4">
             CuraLynx wherever you treat
           </h2>
           <p className="text-[#18181A]/60 text-sm max-w-md mx-auto mb-8">
             Download the desktop app for deep EHR integration, or use the mobile app for ward rounds and on-the-go dictation.
           </p>
           <Link href="/download" className="bg-transparent border border-[#18181A] hover:bg-[#18181A] hover:text-white text-[#18181A] px-8 py-3 rounded-full text-[13px] font-bold transition-all">
              Download now
           </Link>
        </div>
      </section>

      {/* --- TESTIMONIALS (DARK) --- */}
      <section className="bg-[#18181A] text-white py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-[48px] md:text-[64px] leading-tight mb-4">
              Trusted by Physicians
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             {/* Review 1 */}
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col">
                <p className="font-serif text-lg text-white/90 leading-relaxed mb-8 flex-1">
                  "It’s completely changed how I interact with patients. I make eye contact now instead of staring at my screen. The notes are drafted perfectly by the time they leave."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-emerald-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold">Dr. Sarah Jenkins</p>
                    <p className="text-xs text-white/40">Internal Medicine</p>
                  </div>
                </div>
             </div>

             {/* Review 2 */}
             <div className="bg-[#FDFBF2] text-[#18181A] rounded-3xl p-8 flex flex-col md:-translate-y-4 shadow-xl">
                <p className="font-serif text-lg leading-relaxed mb-8 flex-1">
                  "The accuracy on complex oncology terminology is astounding. It saves me about 2 hours of charting every single day. I couldn't go back to normal typing."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-[#0B392A] rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold">Dr. Marcus Vance</p>
                    <p className="text-xs text-[#18181A]/60">Chief of Oncology</p>
                  </div>
                </div>
             </div>

             {/* Review 3 */}
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col">
                <p className="font-serif text-lg text-white/90 leading-relaxed mb-8 flex-1">
                  "Perfect for fast-paced urgent care. The bilingual feature alone is worth it—translating Spanish consultations into English SOAP notes instantly is magic."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold">Dr. Elena Rodriguez</p>
                    <p className="text-xs text-white/40">Urgent Care Director</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA / IMAGE SECTION --- */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
           <h2 className="font-serif text-[60px] md:text-[80px] leading-tight mb-8">
             Start consulting
           </h2>
           <div className="flex items-center justify-center gap-4">
             <Link href="/session" className="bg-[#E9D5FF] hover:bg-[#D8B4FE] text-[#18181A] px-8 py-4 rounded-full text-[15px] font-bold transition-all shadow-lg">
               Try CuraLynx free
             </Link>
             <Link href="/demo" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all shadow-lg">
               Book a Demo
             </Link>
           </div>
        </div>
      </section>

      {/* --- FOOTER (CREAM) --- */}
      <footer className="bg-[#FDFBF2] pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto border-t border-[#18181A]/10 pt-16">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-[13px]">
             <div>
               <h4 className="font-bold text-[#18181A] mb-4">Company</h4>
               <ul className="space-y-3 text-[#18181A]/60">
                 <li><Link href="#">About</Link></li>
                 <li><Link href="#">Careers</Link></li>
                 <li><Link href="#">Security & HIPAA</Link></li>
                 <li><Link href="#">Contact</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-[#18181A] mb-4">Product</h4>
               <ul className="space-y-3 text-[#18181A]/60">
                 <li><Link href="#">Features</Link></li>
                 <li><Link href="#">Pricing</Link></li>
                 <li><Link href="#">Supported EHRs</Link></li>
                 <li><Link href="#">Download</Link></li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-[#18181A] mb-4">Resources</h4>
               <ul className="space-y-3 text-[#18181A]/60">
                 <li><Link href="#">Help Center</Link></li>
                 <li><Link href="#">Case Studies</Link></li>
                 <li><Link href="#">API Docs</Link></li>
                 <li><Link href="#">Blog</Link></li>
               </ul>
             </div>
           </div>

           {/* Massive Logo Bottom */}
           <div className="flex flex-col md:flex-row items-end justify-between gap-8 mt-16">
              <p className="text-[11px] font-semibold tracking-widest text-[#18181A]/40 uppercase">
                © {new Date().getFullYear()} CuraLynx. All rights reserved.
              </p>
              <div className="font-serif text-[60px] md:text-[120px] font-bold text-[#18181A] leading-none tracking-tighter">
                 ..... CuraLynx
              </div>
           </div>
        </div>
      </footer>

    </main>
  );
}
