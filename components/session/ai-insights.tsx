import { Brain, Pill, Syringe } from "lucide-react";

export function AIInsights() {
  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Cura AI</h2>
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Analyzing session...
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-10">
        <div>
          <h3 className="text-[15px] font-bold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4" /> AI Differential Diagnosis
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <div className="bg-primary/10 px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm font-bold text-primary">Tension Headache (85%)</span>
            </div>
            <div className="bg-muted px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40"></span>
              <span className="text-sm font-semibold text-muted-foreground">Migraine (40%)</span>
            </div>
            <div className="bg-muted px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40"></span>
              <span className="text-sm font-semibold text-muted-foreground">Gastritis (35%)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[15px] font-bold text-foreground mb-4 flex items-center gap-2">
              <Pill className="h-4 w-4" /> Suggested Medications
            </h3>
            <div className="space-y-4">
              <div className="bg-card p-5 rounded-[24px] shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm font-bold text-foreground">Paracetamol 500mg</p>
                  <button className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-xs hover:bg-primary/80 transition-colors">
                    +
                  </button>
                </div>
                <p className="text-[13px] font-medium text-muted-foreground mb-4">For reported headache</p>
                <div className="flex gap-2">
                  <span className="text-[11px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">SOS</span>
                  <span className="text-[11px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">Max 3/day</span>
                </div>
              </div>

              <div className="bg-card p-5 rounded-[24px] shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm font-bold text-foreground">Pantoprazole 40mg</p>
                  <button className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-xs hover:bg-primary/80 transition-colors">
                    +
                  </button>
                </div>
                <p className="text-[13px] font-medium text-muted-foreground mb-4">For reported stomach pain</p>
                <div className="flex gap-2">
                  <span className="text-[11px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">1 tab</span>
                  <span className="text-[11px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">Before Breakfast</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-foreground mb-4 flex items-center gap-2">
              <Syringe className="h-4 w-4" /> Recommended Tests
            </h3>
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-[24px] shadow-sm flex justify-between items-center relative overflow-hidden">
                <div className="pl-2 py-1">
                  <p className="text-sm font-bold text-foreground">USG Abdomen</p>
                  <p className="text-[12px] font-medium text-muted-foreground mt-1">To rule out abdominal pathology</p>
                </div>
                <button className="h-8 w-8 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-muted/80 transition-colors mr-1">
                  <span className="sr-only">Add</span>
                  +
                </button>
              </div>

              <div className="bg-card p-4 rounded-[24px] shadow-sm flex justify-between items-center relative overflow-hidden">
                <div className="pl-2 py-1">
                  <p className="text-sm font-bold text-foreground">CBC &amp; CRP</p>
                  <p className="text-[12px] font-medium text-muted-foreground mt-1">Routine systemic evaluation</p>
                </div>
                <button className="h-8 w-8 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-muted/80 transition-colors mr-1">
                  <span className="sr-only">Add</span>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
