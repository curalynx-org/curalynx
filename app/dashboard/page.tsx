import { StatsCards } from "@/components/dashboard/stats-cards";
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { RecentPatients } from "@/components/dashboard/recent-patients";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { HealthChart } from "@/components/dashboard/health-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <div className="px-6 py-6 sm:px-8 lg:px-10">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground">
          Good morning, Dr. Rao
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is what is happening at your clinic today.
        </p>
      </div>

      <StatsCards />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <HealthChart />
          <RecentPatients />
        </div>

        <div className="space-y-6">
          <QuickActions />
          <UpcomingAppointments />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
