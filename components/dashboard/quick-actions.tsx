"use client";

import {
  Mic,
  UserPlus,
  FileText,
  Video,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AddPatientModal } from "./add-patient-modal";
import { StartSessionModal } from "./start-session-modal";

const actions = [
  {
    icon: Mic,
    label: "Start Session",
    description: "Begin live transcription",
    onClick: "session",
    color: "bg-primary text-primary-foreground",
    iconBg: "bg-primary-foreground/15",
  },
  {
    icon: UserPlus,
    label: "Add Patient",
    description: "Register new patient",
    onClick: "patient",
    color: "bg-card text-foreground border border-border",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: FileText,
    label: "New Record",
    description: "Create clinical record",
    href: "/dashboard/records",
    color: "bg-card text-foreground border border-border",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: Video,
    label: "Telehealth",
    description: "Video consultation",
    href: "/dashboard/appointments",
    color: "bg-card text-foreground border border-border",
    iconBg: "bg-purple-100 text-purple-600",
  },
];

export function QuickActions() {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isStartSessionOpen, setIsStartSessionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-bold text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Content = (
              <>
                <span className={`grid size-10 place-items-center rounded-xl ${action.iconBg}`}>
                  <action.icon className="size-5" />
                </span>
                <div className="text-center">
                  <p className="text-sm font-semibold">{action.label}</p>
                  <p className="text-[11px] text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </>
            );

            const className = `group flex flex-col items-center gap-2.5 rounded-xl p-4 transition-all hover:shadow-sm cursor-pointer ${action.color}`;

            if (action.onClick === "patient") {
              return (
                <button
                  key={action.label}
                  onClick={() => setIsAddPatientOpen(true)}
                  className={className}
                >
                  {Content}
                </button>
              );
            }

            if (action.onClick === "session") {
              return (
                <button
                  key={action.label}
                  onClick={() => setIsStartSessionOpen(true)}
                  className={className}
                >
                  {Content}
                </button>
              );
            }

            return (
              <Link
                key={action.label}
                href={action.href || "#"}
                className={className}
              >
                {Content}
              </Link>
            );
          })}
        </div>
      </div>

      <AddPatientModal 
        isOpen={isAddPatientOpen} 
        onClose={() => setIsAddPatientOpen(false)} 
      />
      <StartSessionModal 
        isOpen={isStartSessionOpen}
        onClose={() => setIsStartSessionOpen(false)}
      />
    </>
  );
}
