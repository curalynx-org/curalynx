import { FileText, User } from "lucide-react";

export function PatientSidebar() {
  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <User className="h-8 w-8 text-primary/50" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Priya Sharma</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">38 years &bull; Female &bull; ID: PT-8472</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
            <span className="text-[13px] font-semibold text-foreground/70 mb-6">Blood Pressure</span>
            <p className="text-3xl font-bold text-foreground">118<span className="text-xl text-foreground/70">/75</span></p>
          </div>
          <div className="bg-accent p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
            <span className="text-[13px] font-semibold text-foreground/70 mb-6">Glucose</span>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-foreground">92</p>
              <span className="text-sm font-semibold text-foreground/70">mg/dL</span>
            </div>
          </div>
          <div className="bg-secondary/30 p-5 rounded-[24px] shadow-sm col-span-2 flex justify-between items-center">
            <span className="text-[13px] font-semibold text-foreground/70">Weight &amp; Height</span>
            <span className="text-lg font-bold text-foreground">68 kg &bull; 165 cm</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">Predicted Risks</h3>
          <div className="bg-card p-2 rounded-[24px] shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-2xl">
              <span className="text-sm font-semibold text-foreground">Hypertension</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Moderate</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-2xl">
              <span className="text-sm font-semibold text-foreground">Type 2 Diabetes</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Low</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">Current Medications</h3>
          <div className="bg-card p-2 rounded-[24px] shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-2xl">
              <span className="text-sm font-semibold text-foreground">Cetirizine 10mg</span>
              <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">As needed</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">Past Reports</h3>
          <div className="bg-card p-2 rounded-[24px] shadow-sm flex flex-col gap-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center shadow-sm">
                  <FileText className="h-4 w-4 text-primary/70" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Blood Count</p>
                  <p className="text-xs font-medium text-muted-foreground">Oct 12, 2025</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center shadow-sm">
                  <FileText className="h-4 w-4 text-primary/70" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Chest X-Ray</p>
                  <p className="text-xs font-medium text-muted-foreground">Mar 05, 2025</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
