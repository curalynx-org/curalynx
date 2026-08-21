"use client";
import { ChevronRight, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function RecentPatients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        
        const res = await fetch(`/api/patients?providerId=${user.id}`);
        const data = await res.json();
        
        if (res.ok) {
          // Take only the most recent 5
          setPatients(data.slice(0, 5));
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
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-foreground">Recent Patients</h3>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          View all <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center p-4 text-sm text-muted-foreground">
            No patients found. Add one to get started.
          </div>
        ) : (
          patients.map((patient) => {
            const shortId = "PT-" + patient._id.substring(patient._id.length - 4).toUpperCase();
            // Just extracting a reason or default text for the 'diagnosis' area
            const diagnosis = patient.medicalHistory?.length > 0 ? patient.medicalHistory[0] : "New Registration";

            return (
              <div
                key={patient._id}
                className="group flex items-center gap-3.5 rounded-xl border border-border/60 p-3 transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer"
              >
                <div
                  className="relative grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold overflow-hidden bg-primary/10 text-primary"
                >
                  {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <span className="text-[11px] font-medium text-muted-foreground ml-2 whitespace-nowrap">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {shortId} &middot; {diagnosis}
                    </p>
                    <button className="grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                      <FileText className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
