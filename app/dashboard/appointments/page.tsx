import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { Calendar as CalendarIcon, Clock, MoreVertical, Plus } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="px-6 py-6 sm:px-8 lg:px-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your daily schedule and upcoming patient visits.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors w-fit">
          <Plus className="size-4" />
          New Appointment
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Calendar View Placeholder */}
        <div className="rounded-2xl border border-border bg-card p-6 min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="size-5 text-primary" />
              Schedule Overview
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Today</span>
              <button className="grid place-items-center size-8 rounded-lg border border-border hover:bg-muted transition-colors">
                <MoreVertical className="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 border-t border-border/50 relative">
            {/* Mock Timeline */}
            <div className="absolute top-10 left-0 right-0 border-t border-dashed border-border/50" />
            <div className="absolute top-32 left-0 right-0 border-t border-dashed border-border/50" />
            <div className="absolute top-52 left-0 right-0 border-t border-dashed border-border/50" />
            
            <div className="absolute top-8 left-16 right-4 bg-emerald-100 border border-emerald-200 rounded-xl p-3 shadow-sm">
              <p className="text-xs font-bold text-emerald-800">10:00 AM - 10:30 AM</p>
              <p className="text-sm font-semibold text-emerald-900 mt-0.5">Amit Patel &middot; Follow-up</p>
            </div>
            
            <div className="absolute top-28 left-16 right-4 bg-emerald-100 border border-emerald-200 rounded-xl p-3 shadow-sm opacity-60">
              <p className="text-xs font-bold text-emerald-800">10:30 AM - 11:00 AM</p>
              <p className="text-sm font-semibold text-emerald-900 mt-0.5">Sunita Devi &middot; Consultation</p>
            </div>
            
            <div className="absolute top-48 left-16 right-4 bg-blue-50 border border-blue-200 rounded-xl p-3 shadow-sm">
              <p className="text-xs font-bold text-blue-800">11:00 AM - 11:30 AM</p>
              <p className="text-sm font-semibold text-blue-900 mt-0.5">Rahul Singh &middot; Check-up</p>
            </div>
            
            {/* Timeline Labels */}
            <div className="absolute top-6 left-0 text-xs font-medium text-muted-foreground">10 AM</div>
            <div className="absolute top-28 left-0 text-xs font-medium text-muted-foreground">11 AM</div>
            <div className="absolute top-48 left-0 text-xs font-medium text-muted-foreground">12 PM</div>
          </div>
        </div>

        {/* List View */}
        <div className="space-y-6">
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
}
