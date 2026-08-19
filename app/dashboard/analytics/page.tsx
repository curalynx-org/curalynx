import { HealthChart } from "@/components/dashboard/health-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { BarChart3, TrendingUp, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="px-6 py-6 sm:px-8 lg:px-10 h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">
            Analytics & Insights
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Clinic performance, patient demographics, and session completion rates.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-lg shadow-sm">
          <button className="px-3 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-md shadow-sm">30 Days</button>
          <button className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground">3 Months</button>
          <button className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground">1 Year</button>
        </div>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-[400px]">
          <HealthChart />
        </div>
        
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="size-5 text-primary" />
              Patient Demographics
            </h2>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative">
            {/* Mock Donut Chart */}
            <div className="relative size-48 rounded-full border-[16px] border-primary/20 flex items-center justify-center">
               <div className="absolute inset-0 rounded-full border-[16px] border-primary" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)" }}></div>
               <div className="absolute inset-0 rounded-full border-[16px] border-secondary" style={{ clipPath: "polygon(0 50%, 100% 100%, 0 100%)" }}></div>
               <div className="text-center">
                 <p className="text-3xl font-bold">2.8k</p>
                 <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total</p>
               </div>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-primary"></span>
                <span className="text-sm font-semibold text-foreground">Adults (18-64)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-secondary"></span>
                <span className="text-sm font-semibold text-foreground">Seniors (65+)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-sm bg-primary/20"></span>
                <span className="text-sm font-semibold text-foreground">Pediatric (0-17)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" />
            Time Saved via AI Transcription
          </h2>
          <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
            <TrendingUp className="size-4" />
            +24 hrs this week
          </span>
        </div>
        
        <div className="h-48 flex items-end gap-2 border-b border-border/50 pb-2 relative">
          {/* Mock Bar Chart */}
          <div className="absolute left-0 bottom-2 top-0 w-full flex flex-col justify-between text-xs text-muted-foreground font-medium pointer-events-none">
            <span>40h</span>
            <span>30h</span>
            <span>20h</span>
            <span>10h</span>
            <span>0h</span>
          </div>
          
          <div className="flex-1"></div> {/* spacer */}
          {[20, 25, 18, 30, 40, 35, 28].map((h, i) => (
            <div key={i} className="w-full max-w-[40px] bg-primary/20 rounded-t-sm relative group">
              <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all" style={{ height: `${(h/40)*100}%` }}></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between pl-8 pr-2 pt-2 text-xs text-muted-foreground font-semibold">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
