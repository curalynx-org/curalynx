"use client";
import { Clock, Video, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);
        
        // In a real app, you might fetch only today's upcoming appts
        const res = await fetch(`/api/appointments?providerId=${user.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setAppointments(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-foreground">Upcoming Appointments</h3>
        <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          View all <ChevronRight className="size-3" />
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center p-4 text-sm text-muted-foreground">
            No upcoming appointments.
          </div>
        ) : (
          appointments.map((appt) => {
            const apptDate = new Date(appt.date);
            const timeString = apptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return (
              <div
                key={appt._id}
                className="group flex items-center gap-3.5 rounded-xl border p-3 transition-all hover:shadow-sm cursor-pointer border-border/60 hover:border-primary/30"
              >
                <div className="relative">
                  <div
                    className="relative grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold overflow-hidden bg-primary/10 text-primary"
                  >
                    {appt.patientId?.firstName?.charAt(0) || "U"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {appt.patientId?.firstName} {appt.patientId?.lastName}
                    </p>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground ml-2">
                      <Clock className="size-3" />
                      {timeString}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground capitalize">
                      {appt.type}
                    </p>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                      <Video className="size-3" />
                      {appt.status}
                    </span>
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
