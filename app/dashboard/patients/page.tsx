"use client";

import { Search, Filter, Users as UsersIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddPatientModal } from "@/components/dashboard/add-patient-modal";

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        
        const res = await fetch(`/api/patients?providerId=${user.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setPatients(data);
        }
      } catch (err) {
        console.error("Failed to fetch patients", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, []);

  return (
    <>
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
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors w-fit"
          >
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
              className="w-full h-12 rounded-full border border-border bg-card pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm text-foreground"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:bg-muted transition-colors">
            <Filter className="size-4" />
            Filters
          </button>
        </div>

        {loading ? (
          <div className="flex-1 grid place-items-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : patients.length === 0 ? (
          <div className="flex-1 grid place-items-center text-muted-foreground">
            No patients registered yet. Add one to get started.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            {patients.map((pt) => {
              const shortId = "PT-" + pt._id.substring(pt._id.length - 4).toUpperCase();
              const diag = pt.medicalHistory?.length > 0 ? pt.medicalHistory[0] : "New Registration";
              
              // Calculate age
              const dob = new Date(pt.dateOfBirth);
              const ageDifMs = Date.now() - dob.getTime();
              const ageDate = new Date(ageDifMs);
              const age = Math.abs(ageDate.getUTCFullYear() - 1970);

              return (
                <div key={pt._id} className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md cursor-pointer flex flex-col items-center text-center">
                  <div className="relative grid size-16 place-items-center rounded-full overflow-hidden mb-3 border-2 border-border/50 group-hover:border-primary/30 transition-colors bg-primary/10 text-primary font-bold text-xl">
                    {pt.firstName.charAt(0)}{pt.lastName.charAt(0)}
                  </div>
                  <h3 className="text-base font-bold text-foreground">{pt.firstName} {pt.lastName}</h3>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">{shortId} &middot; {age}y</p>
                  <span className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary max-w-full truncate">
                    {diag}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <AddPatientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  );
}
