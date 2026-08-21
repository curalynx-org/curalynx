import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
