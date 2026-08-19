import { ChevronRight, FileText } from "lucide-react";

const patients = [
  {
    name: "Priya Sharma",
    id: "PT-8472",
    lastVisit: "Today",
    diagnosis: "Tension Headache",
    avatar: "PS",
    image: "https://i.pravatar.cc/150?u=Priya",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Vikram Rao",
    id: "PT-6291",
    lastVisit: "Yesterday",
    diagnosis: "Seasonal Allergy",
    avatar: "VR",
    image: "https://i.pravatar.cc/150?u=Vikram",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Ananya Gupta",
    id: "PT-7834",
    lastVisit: "2 days ago",
    diagnosis: "Type 2 Diabetes",
    avatar: "AG",
    image: "https://i.pravatar.cc/150?u=Ananya",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Sanjay Kumar",
    id: "PT-5103",
    lastVisit: "3 days ago",
    diagnosis: "Hypertension",
    avatar: "SK",
    image: "https://i.pravatar.cc/150?u=Sanjay",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Deepa Nair",
    id: "PT-9021",
    lastVisit: "5 days ago",
    diagnosis: "Migraine",
    avatar: "DN",
    image: "https://i.pravatar.cc/150?u=Deepa",
    color: "bg-purple-100 text-purple-700",
  },
];

export function RecentPatients() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-foreground">Recent Patients</h3>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          View all <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="group flex items-center gap-3.5 rounded-xl border border-border/60 p-3 transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer"
          >
            <div
              className={`relative grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold overflow-hidden ${patient.color}`}
            >
              <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground truncate">
                  {patient.name}
                </p>
                <span className="text-[11px] font-medium text-muted-foreground ml-2 whitespace-nowrap">
                  {patient.lastVisit}
                </span>
              </div>
              <div className="mt-0.5 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {patient.id} &middot; {patient.diagnosis}
                </p>
                <button className="grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                  <FileText className="size-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
