import { Clock, Video, ChevronRight } from "lucide-react";

const appointments = [
  {
    name: "Amit Patel",
    age: 42,
    time: "10:00 AM",
    type: "Follow-up",
    status: "ready",
    avatar: "AP",
    image: "https://i.pravatar.cc/150?u=Amit",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Sunita Devi",
    age: 35,
    time: "10:30 AM",
    type: "Consultation",
    status: "in-progress",
    avatar: "SD",
    image: "https://i.pravatar.cc/150?u=Sunita",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Rahul Singh",
    age: 28,
    time: "11:00 AM",
    type: "Check-up",
    status: "upcoming",
    avatar: "RS",
    image: "https://i.pravatar.cc/150?u=Rahul",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Meera Joshi",
    age: 55,
    time: "11:30 AM",
    type: "Prescription Review",
    status: "upcoming",
    avatar: "MJ",
    image: "https://i.pravatar.cc/150?u=Meera",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Karan Mehta",
    age: 31,
    time: "12:00 PM",
    type: "New Patient",
    status: "upcoming",
    avatar: "KM",
    image: "https://i.pravatar.cc/150?u=Karan",
    color: "bg-purple-100 text-purple-700",
  },
];

export function UpcomingAppointments() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-foreground">Upcoming Appointments</h3>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          View all <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="space-y-3">
        {appointments.map((appt) => (
          <div
            key={appt.name}
            className={`group flex items-center gap-3.5 rounded-xl border p-3 transition-all hover:shadow-sm cursor-pointer ${
              appt.status === "ready"
                ? "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300"
                : "border-border/60 hover:border-primary/30"
            }`}
          >
            <div className="relative">
              <div
                className={`relative grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold overflow-hidden ${appt.color}`}
              >
                <img src={appt.image} alt={appt.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground truncate">
                  {appt.name}
                </p>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground ml-2">
                  <Clock className="size-3" />
                  {appt.time}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {appt.type} &middot; {appt.age}y
                </p>
                {appt.status === "in-progress" ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    In Progress
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                    <Video className="size-3" />
                    Ready
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
