"use client";

import {
  FileText,
  UserPlus,
  Mic,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

export function ActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;
        const user = JSON.parse(userStr);

        // Fetch recent records to simulate activity
        const res = await fetch(`/api/records?providerId=${user.id}`);
        const data = await res.json();

        if (res.ok) {
          const mappedActivities = data.slice(0, 6).map((record: any) => {
            const ptName = record.patientId ? `${record.patientId.firstName} ${record.patientId.lastName}` : "Unknown Patient";
            let icon = FileText;
            let iconColor = "bg-blue-100 text-blue-600";
            let text = `Clinical record created for ${ptName}`;

            if (record.type === "lab_result") {
              icon = CheckCircle2;
              iconColor = "bg-amber-100 text-amber-600";
              text = `Lab results uploaded for ${ptName}`;
            } else if (record.type === "prescription") {
              icon = FileText;
              iconColor = "bg-emerald-100 text-emerald-600";
              text = `Prescription generated for ${ptName}`;
            } else if (record.type === "soap_note") {
              icon = FileText;
              iconColor = "bg-purple-100 text-purple-600";
              text = `SOAP note auto-structured for ${ptName}`;
            }

            return {
              icon,
              iconColor,
              text,
              time: new Date(record.date).toLocaleDateString(),
              id: record._id,
            };
          });

          setActivities(mappedActivities);
        }
      } catch (err) {
        console.error("Failed to fetch activities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-5 text-sm font-bold text-foreground">Recent Activity</h3>

      <div className="space-y-1">
        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center p-4 text-sm text-muted-foreground">
            No recent activity.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/50"
            >
              <span
                className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${activity.iconColor}`}
              >
                <activity.icon className="size-[14px]" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  {activity.text}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
