import { PatientSidebar } from "@/components/patient/patient-sidebar";
import { PatientHeader } from "@/components/patient/patient-header";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#FDFBF2] overflow-hidden text-[#18181A]">
      <PatientSidebar />

      <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
        <PatientHeader />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
