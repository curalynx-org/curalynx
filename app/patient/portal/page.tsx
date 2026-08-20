import { Calendar, FileText, Pill, ChevronRight, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PatientDashboardPage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-[#18181A]">
          Good morning, Emily
        </h1>
        <p className="mt-1 text-sm text-[#18181A]/60 font-medium">
          Here's an overview of your health and upcoming appointments.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="rounded-2xl border border-[#18181A]/10 bg-white p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Calendar className="size-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0B392A] mb-4">
                <Calendar className="size-4" />
                UPCOMING APPOINTMENT
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#18181A] mb-1">Dr. Sarah Chen</h2>
              <p className="text-[#18181A]/70 font-medium mb-6">General Practice &middot; Annual Checkup</p>
              
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-[11px] font-bold text-[#18181A]/50 uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-bold text-[#18181A]">Tomorrow, Oct 25</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#18181A]/50 uppercase tracking-wider mb-1">Time</p>
                  <p className="text-sm font-bold text-[#18181A]">10:00 AM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-[#E9D5FF] text-[#18181A] text-sm font-bold rounded-lg border border-[#18181A]/10 hover:bg-[#D8B4FE] transition-colors shadow-sm">
                  Reschedule
                </button>
                <button className="px-5 py-2.5 bg-white text-[#18181A] text-sm font-bold rounded-lg border border-[#18181A]/10 hover:bg-[#18181A]/5 transition-colors">
                  Check In
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/patient/book" className="group p-5 rounded-2xl border border-[#18181A]/10 bg-white hover:shadow-md transition-all flex flex-col items-start gap-4">
              <div className="grid size-10 place-items-center bg-[#0B392A] text-white rounded-lg">
                <Activity className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#18181A]">Find a Doctor</h3>
                <p className="text-xs text-[#18181A]/60 font-medium mt-0.5">Browse specialties and book</p>
              </div>
              <ArrowRight className="size-4 text-[#18181A]/30 group-hover:text-[#18181A] group-hover:translate-x-1 transition-all mt-auto" />
            </Link>
            
            <Link href="#" className="group p-5 rounded-2xl border border-[#18181A]/10 bg-white hover:shadow-md transition-all flex flex-col items-start gap-4">
              <div className="grid size-10 place-items-center bg-[#18181A]/5 text-[#18181A] rounded-lg">
                <Pill className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#18181A]">Request Refill</h3>
                <p className="text-xs text-[#18181A]/60 font-medium mt-0.5">Renew your active prescriptions</p>
              </div>
              <ArrowRight className="size-4 text-[#18181A]/30 group-hover:text-[#18181A] group-hover:translate-x-1 transition-all mt-auto" />
            </Link>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Recent Records */}
          <div className="rounded-2xl border border-[#18181A]/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-[#18181A]">Recent Results</h3>
              <Link href="/patient/records" className="flex items-center gap-1 text-xs font-bold text-[#0B392A] hover:underline">
                View all <ChevronRight className="size-3" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {[
                { title: "Complete Blood Count", date: "Oct 12, 2023", status: "Normal", color: "text-emerald-700 bg-emerald-100 border-emerald-200" },
                { title: "Lipid Panel", date: "Oct 12, 2023", status: "Review", color: "text-amber-700 bg-amber-100 border-amber-200" },
                { title: "Metabolic Panel", date: "Sep 05, 2023", status: "Normal", color: "text-emerald-700 bg-emerald-100 border-emerald-200" },
              ].map((record, i) => (
                <div key={i} className="group flex items-center justify-between rounded-xl border border-[#18181A]/10 p-3 hover:border-[#0B392A]/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center bg-[#18181A]/5 rounded-md">
                      <FileText className="size-4 text-[#18181A]/60" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#18181A]">{record.title}</p>
                      <p className="text-[11px] font-medium text-[#18181A]/50">{record.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${record.color}`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Medications */}
          <div className="rounded-2xl border border-[#18181A]/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-[#18181A]">Active Prescriptions</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-[#18181A]">Lisinopril (10mg)</p>
                <p className="text-xs font-medium text-[#18181A]/60 mt-0.5">Take 1 tablet daily</p>
                <div className="mt-2 w-full bg-[#18181A]/5 rounded-full h-1.5">
                  <div className="bg-[#0B392A] h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-[10px] font-bold text-[#18181A]/40 mt-1 uppercase tracking-wider text-right">14 days left</p>
              </div>
              <div className="pt-3 border-t border-[#18181A]/5">
                <p className="text-sm font-bold text-[#18181A]">Atorvastatin (20mg)</p>
                <p className="text-xs font-medium text-[#18181A]/60 mt-0.5">Take 1 tablet at bedtime</p>
                <div className="mt-2 w-full bg-[#18181A]/5 rounded-full h-1.5">
                  <div className="bg-[#E9D5FF] h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-[10px] font-bold text-[#18181A]/40 mt-1 uppercase tracking-wider text-right">24 days left</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
