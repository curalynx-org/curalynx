"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  HeartPulse,
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  BarChart3,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Appointments", href: "/dashboard/appointments" },
  { icon: Users, label: "Patients", href: "/dashboard/patients" },
  { icon: FileText, label: "Records", href: "/dashboard/records" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    role: string;
    initials: string;
  }>({
    name: "Dr. Rao",
    role: "Consultant Physician",
    initials: "DR",
  });

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const name = user.name || (user.firstName ? `Dr. ${user.firstName} ${user.lastName || ""}`.trim() : "Dr. Rao");
        const initials = name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "DR";

        setUserProfile({
          name,
          role: user.role || "Consultant Physician",
          initials,
        });
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-screen border-r border-border bg-card transition-all duration-300 flex-shrink-0 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#0B392A] text-white">
            <HeartPulse className="size-5" />
          </span>
          {!collapsed && (
            <span className="text-lg font-semibold tracking-tight text-foreground whitespace-nowrap">
              Curalynx
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="mt-2 flex-1 overflow-y-auto px-3">
        <p className={`mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${collapsed ? "sr-only" : "px-2"}`}>
          Menu
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#0B392A] text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="size-[18px] shrink-0" />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Area (Doctor Login Avatar in place of Settings) */}
      <div className="mt-auto border-t border-border px-3 py-3 space-y-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <HelpCircle className="size-[18px] shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Help Center</span>}
        </Link>

        {/* Doctor Login Profile Card */}
        <div
          className={`flex items-center rounded-2xl border border-border/80 bg-muted/40 p-2 transition-colors ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#0B392A] text-xs font-bold text-white shadow-2xs">
              {userProfile.initials}
            </div>

            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-foreground truncate leading-tight">
                  {userProfile.name}
                </p>
                <p className="text-[10.5px] text-muted-foreground truncate">
                  {userProfile.role}
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
