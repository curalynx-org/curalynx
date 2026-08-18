import {
  Users,
  CalendarCheck,
  FileText,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    label: "Total Patients",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Appointments Today",
    value: "24",
    change: "+3",
    trend: "up" as const,
    icon: CalendarCheck,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Records Generated",
    value: "1,234",
    change: "+8.2%",
    trend: "up" as const,
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Active Sessions",
    value: "6",
    change: "-2",
    trend: "down" as const,
    icon: Activity,
    color: "bg-amber-100 text-amber-700",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </span>
            <span className={`grid size-9 place-items-center rounded-xl ${stat.color}`}>
              <stat.icon className="size-[18px]" />
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {stat.value}
            </p>
            <span
              className={`flex items-center gap-0.5 text-xs font-semibold ${
                stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
