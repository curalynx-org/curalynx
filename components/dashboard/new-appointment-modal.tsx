"use client";

import { X, User, Calendar, Clock, FileText, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewAppointmentModal({ isOpen, onClose }: NewAppointmentModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-foreground">Schedule Appointment</h2>
            <p className="text-sm text-muted-foreground mt-1">Book a new appointment for a patient.</p>
          </div>
          <button 
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Patient Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <select className="w-full h-11 rounded-xl border border-border bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer text-muted-foreground" required>
                <option value="" disabled selected>Select a patient...</option>
                <option value="1">Amit Patel (PT-1122)</option>
                <option value="2">Sunita Devi (PT-3344)</option>
                <option value="3">Rahul Singh (PT-6291)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="date" className="w-full h-11 rounded-xl border border-border bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-muted-foreground" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="time" className="w-full h-11 rounded-xl border border-border bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-muted-foreground" required />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Appointment Type</label>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <select className="w-full h-11 rounded-xl border border-border bg-transparent pl-10 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer text-muted-foreground" required>
                <option value="" disabled selected>Select type...</option>
                <option value="consultation">Consultation</option>
                <option value="followup">Follow-up</option>
                <option value="checkup">Annual Check-up</option>
                <option value="prescription">Prescription Review</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Reason / Notes</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <textarea placeholder="Briefly describe the reason for this appointment..." className="w-full h-24 rounded-xl border border-border bg-transparent pl-10 pr-4 pt-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
              Schedule Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
