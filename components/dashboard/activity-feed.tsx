import {
  FileText,
  UserPlus,
  Mic,
  CheckCircle2,
  Clock,
} from "lucide-react";

const activities = [
  {
    icon: FileText,
    iconColor: "bg-blue-100 text-blue-600",
    text: "Prescription generated for Priya Sharma",
    time: "2 min ago",
  },
  {
    icon: Mic,
    iconColor: "bg-emerald-100 text-emerald-600",
    text: "Live session completed with Sunita Devi",
    time: "18 min ago",
  },
  {
    icon: UserPlus,
    iconColor: "bg-primary/10 text-primary",
    text: "New patient registered: Karan Mehta",
    time: "1 hour ago",
  },
  {
    icon: CheckCircle2,
    iconColor: "bg-amber-100 text-amber-600",
    text: "Lab results uploaded for Ananya Gupta",
    time: "3 hours ago",
  },
  {
    icon: FileText,
    iconColor: "bg-blue-100 text-blue-600",
    text: "Clinical record auto-structured for Vikram Rao",
    time: "5 hours ago",
  },
  {
    icon: Clock,
    iconColor: "bg-zinc-100 text-zinc-600",
    text: "Weekly analytics report ready",
    time: "Yesterday",
  },
];

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-5 text-sm font-bold text-foreground">Recent Activity</h3>

      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/50"
          >
            <span
              className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${activity.iconColor}`}
            >
              <activity.icon className="size-[14px]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug">
                {activity.text}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
