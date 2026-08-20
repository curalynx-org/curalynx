import { RecentPatients } from "@/components/dashboard/recent-patients";
import { Search, Filter, Users as UsersIcon } from "lucide-react";

export default function PatientsPage() {
  return (
    <div className="px-6 py-6 sm:px-8 lg:px-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">
            Patient Directory
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all registered patients in the clinic.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors w-fit">
          <UsersIcon className="size-4" />
          Add Patient
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, ID, or condition..."
            className="w-full h-12 rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:bg-muted transition-colors">
          <Filter className="size-4" />
          Filters
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {[
          { name: "Priya Sharma", id: "PT-8472", age: "34y", diag: "Tension Headache", img: "https://i.pravatar.cc/150?u=Priya" },
          { name: "Vikram Rao", id: "PT-6291", age: "45y", diag: "Seasonal Allergy", img: "https://i.pravatar.cc/150?u=Vikram" },
          { name: "Ananya Gupta", id: "PT-7834", age: "29y", diag: "Type 2 Diabetes", img: "https://i.pravatar.cc/150?u=Ananya" },
          { name: "Sanjay Kumar", id: "PT-5103", age: "52y", diag: "Hypertension", img: "https://i.pravatar.cc/150?u=Sanjay" },
          { name: "Deepa Nair", id: "PT-9021", age: "41y", diag: "Migraine", img: "https://i.pravatar.cc/150?u=Deepa" },
          { name: "Amit Patel", id: "PT-1122", age: "42y", diag: "Follow-up", img: "https://i.pravatar.cc/150?u=Amit" },
          { name: "Sunita Devi", id: "PT-3344", age: "35y", diag: "Consultation", img: "https://i.pravatar.cc/150?u=Sunita" },
          { name: "Karan Mehta", id: "PT-5566", age: "31y", diag: "New Patient", img: "https://i.pravatar.cc/150?u=Karan" },
        ].map((pt) => (
          <div key={pt.id} className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md cursor-pointer flex flex-col items-center text-center">
            <div className="relative size-16 rounded-full overflow-hidden mb-3 border-2 border-border/50 group-hover:border-primary/30 transition-colors">
              <img src={pt.img} alt={pt.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-foreground">{pt.name}</h3>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5">{pt.id} &middot; {pt.age}</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {pt.diag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
