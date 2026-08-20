"use client";

import { LayoutDashboard, FileText, CalendarDays, PlusCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "My Health", href: "/patient/portal" },
  { icon: FileText, label: "Records & Results", href: "/patient/records" },
  { icon: CalendarDays, label: "Appointments", href: "/patient/appointments" },
  { icon: PlusCircle, label: "Book Appointment", href: "/patient/book" },
];

export function PatientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[260px] flex-col border-r border-[#18181A]/10 bg-[#FDFBF2]">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid size-8 place-items-center bg-[#0B392A] text-[#FDFBF2] rounded-lg">
            <span className="font-serif font-bold text-sm">C</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-[#18181A]">CuraLynx</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                active 
                  ? "bg-[#0B392A] text-[#FDFBF2]" 
                  : "text-[#18181A]/70 hover:bg-[#18181A]/5 hover:text-[#18181A]"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#18181A]/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#18181A]/5 p-3">
          <img src="https://i.pravatar.cc/150?u=patient" alt="Patient" className="size-9 rounded-full border border-[#18181A]/10" />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-bold text-[#18181A]">Emily Rodriguez</p>
            <p className="truncate text-[11px] font-semibold text-[#18181A]/60">Patient ID: 90210</p>
          </div>
        </div>
        <Link 
          href="/login" 
          className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="size-4" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
