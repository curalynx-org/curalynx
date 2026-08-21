import { Brain, Pill, Syringe, AlertTriangle, ShieldAlert } from "lucide-react";

interface AIInsightsProps {
  patientId: string;
  insights?: {
    medicines?: string[];
    tests?: string[];
  };
}

export function AIInsights({ patientId, insights }: AIInsightsProps) {
  const medicines = insights?.medicines || [];
  const tests = insights?.tests || [];
  const hasInsights = medicines.length > 0 || tests.length > 0;

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#18181A] flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-[#18181A]">Cura AI</h2>
            <p className="text-sm text-[#18181A]/60 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18181A] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#18181A]"></span>
              </span>
              Analyzing session...
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-10">
        
        {!hasInsights && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-2xl">
            <p className="text-sm">Speak into the microphone to receive real-time LLM insights.</p>
          </div>
        )}

        {hasInsights && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Medication Recommendations */}
            {medicines.length > 0 && (
              <div>
                <h3 className="text-[15px] font-bold text-[#18181A] mb-4 flex items-center gap-2">
                  <Pill className="h-4 w-4" /> Suggested Medications
                </h3>
                <div className="space-y-4">
                  {medicines.map((med, i) => (
                    <div key={i} className="bg-[#FDFBF2] border border-[#18181A]/20 p-5 rounded-[24px] relative overflow-hidden">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-sm font-bold text-[#18181A] pr-4">{med}</p>
                        <button className="h-7 w-7 shrink-0 rounded-full bg-[#E9D5FF] text-[#18181A] border border-[#18181A] flex items-center justify-center font-bold text-xs hover:bg-[#D8B4FE] transition-colors">
                          +
                        </button>
                      </div>
                      <p className="text-[13px] font-medium text-[#18181A]/60 mb-4">Recommended by Groq LLM</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Tests */}
            {tests.length > 0 && (
              <div>
                <h3 className="text-[15px] font-bold text-[#18181A] mb-4 flex items-center gap-2">
                  <Syringe className="h-4 w-4" /> Recommended Tests
                </h3>
                <div className="space-y-4">
                  {tests.map((test, i) => (
                    <div key={i} className="bg-[#FDFBF2] border border-[#18181A]/20 p-4 rounded-[24px] flex justify-between items-center relative overflow-hidden">
                      <div className="pl-2 py-1 pr-4">
                        <p className="text-sm font-bold text-[#18181A]">{test}</p>
                        <p className="text-[12px] font-medium text-[#18181A]/60 mt-1">Recommended by Groq LLM</p>
                      </div>
                      <button className="h-8 w-8 shrink-0 rounded-full border border-[#18181A]/10 text-[#18181A] flex items-center justify-center hover:bg-[#18181A]/5 transition-colors mr-1">
                        <span className="sr-only">Add</span>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
