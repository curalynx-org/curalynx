"use client";

import { useState } from "react";
import {
  HeartPulse,
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: CalendarDays, label: "Appointments", href: "/dashboard/appointments", active: false },
  { icon: Users, label: "Patients", href: "/dashboard/patients", active: false },
  { icon: FileText, label: "Records", href: "/dashboard/records", active: false },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", active: false },
];

const bottomItems = [
  { icon: HelpCircle, label: "Help Center", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen border-r border-border bg-card transition-all duration-300 flex-shrink-0 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
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
          className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto px-3">
        <p className={`mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${collapsed ? "sr-only" : "px-2"}`}>
          Menu
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="size-[18px] shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-border px-3 py-3">
        <nav className="flex flex-col gap-1">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <item.icon className="size-[18px] shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
          <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="size-[18px] shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Log out</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
}
