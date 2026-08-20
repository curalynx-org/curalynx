"use client";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const sessionsData = [65, 72, 80, 68, 90, 85, 95, 88, 92, 100, 94, 108];
const maxVal = Math.max(...sessionsData);

export function HealthChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-foreground">Sessions Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly completed sessions</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-muted/50 p-0.5">
          {["6M", "1Y", "All"].map((period, i) => (
            <button
              key={period}
              className={`rounded-md px-3 py-1 text-[11px] font-semibold transition-colors ${
                i === 0
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-1.5 h-40">
        {sessionsData.map((val, i) => (
          <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
            <div className="w-full relative">
              <div
                className="w-full rounded-t-md bg-primary/15 transition-all group-hover:bg-primary/25"
                style={{ height: `${(val / maxVal) * 120}px` }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-t-md bg-primary transition-all group-hover:bg-primary/90"
                  style={{ height: "60%" }}
                />
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">
              {months[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary" />
          <span className="text-[11px] text-muted-foreground">Sessions: <strong className="text-foreground">1,057</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary/25" />
          <span className="text-[11px] text-muted-foreground">Avg/day: <strong className="text-foreground">8.5</strong></span>
        </div>
      </div>
    </div>
  );
}
