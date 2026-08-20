import { Calendar as CalendarIcon, Clock, MapPin, Video, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function PatientAppointmentsPage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10 max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-[#18181A]">
            My Appointments
          </h1>
          <p className="mt-1 text-sm text-[#18181A]/60 font-medium">
            Manage your upcoming visits and view past appointment history.
          </p>
        </div>
        <Link href="/patient/book" className="flex items-center gap-2 bg-[#0B392A] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-[#0B392A]/90 transition-colors w-fit">
          <PlusCircle className="size-4" />
          Book Appointment
        </Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-[#18181A] border-b border-[#18181A]/10 pb-2">Upcoming</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?u=doc" alt="Doctor" className="size-12 rounded-full border border-emerald-200" />
                <div>
                  <h3 className="font-bold text-[#18181A] text-lg">Dr. Sarah Chen</h3>
                  <p className="text-xs font-semibold text-[#18181A]/60">General Practice</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                </span>
                Confirmed
              </span>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm font-medium text-[#18181A]/70">
                <CalendarIcon className="size-4 text-[#0B392A]" />
                Tomorrow, Oct 25, 2023
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#18181A]/70">
                <Clock className="size-4 text-[#0B392A]" />
                10:00 AM - 10:30 AM
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#18181A]/70">
                <MapPin className="size-4 text-[#0B392A]" />
                Oakland Clinic, Room 3B
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-white text-[#18181A] text-sm font-bold rounded-lg border border-[#18181A]/10 hover:bg-[#18181A]/5 transition-colors">
                Reschedule
              </button>
              <button className="flex-1 py-2 bg-[#18181A] text-white text-sm font-bold rounded-lg hover:bg-[#18181A]/90 transition-colors shadow-sm">
                Check In
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <h2 className="text-lg font-bold text-[#18181A] border-b border-[#18181A]/10 pb-2">Past Appointments</h2>
        
        <div className="space-y-4">
          {[
            { doc: "Dr. James Wilson", spec: "Dermatology", date: "Sep 28, 2023", time: "2:15 PM", type: "in-person" },
            { doc: "Dr. Sarah Chen", spec: "General Practice", date: "Mar 14, 2023", time: "9:00 AM", type: "telehealth" },
            { doc: "Dr. Sarah Chen", spec: "General Practice", date: "Oct 10, 2022", time: "11:30 AM", type: "in-person" },
          ].map((apt, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-[#18181A]/10 bg-white hover:border-[#18181A]/20 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center bg-[#18181A]/5 rounded-full text-[#18181A]/40">
                  {apt.type === "telehealth" ? <Video className="size-5" /> : <MapPin className="size-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-[#18181A]">{apt.doc}</h3>
                  <p className="text-xs font-semibold text-[#18181A]/60">{apt.spec}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end gap-1">
                <p className="text-sm font-bold text-[#18181A]">{apt.date}</p>
                <p className="text-xs font-medium text-[#18181A]/60">{apt.time}</p>
              </div>
              
              <button className="sm:ml-4 px-4 py-2 text-xs font-bold text-[#0B392A] bg-[#0B392A]/5 hover:bg-[#0B392A]/10 rounded-lg transition-colors w-fit">
                View Summary
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
