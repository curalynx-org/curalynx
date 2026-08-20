import { FileText, Download, Filter, Search } from "lucide-react";

export default function PatientRecordsPage() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10 max-w-6xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-[#18181A]">
            Health Records
          </h1>
          <p className="mt-1 text-sm text-[#18181A]/60 font-medium">
            View and download your lab results, imaging, and visit summaries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-[#18181A]/20 bg-white px-4 py-2 rounded-lg text-sm font-bold text-[#18181A] hover:bg-[#18181A]/5 transition-colors shadow-sm">
            <Filter className="size-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#18181A]/40" />
        <input 
          type="text" 
          placeholder="Search records by name, doctor, or date..." 
          className="w-full h-12 rounded-xl border border-[#18181A]/10 bg-white pl-11 pr-4 text-sm font-medium focus:border-[#0B392A] focus:outline-none focus:ring-1 focus:ring-[#0B392A] transition-all shadow-sm"
        />
      </div>

      <div className="rounded-2xl border border-[#18181A]/10 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#18181A]/5 text-[11px] uppercase tracking-wider text-[#18181A]/50 font-bold border-b border-[#18181A]/10">
              <tr>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181A]/5 text-[#18181A]">
              {[
                { name: "Annual Physical Summary", provider: "Dr. Sarah Chen", date: "Oct 15, 2023", type: "Visit Note" },
                { name: "Complete Blood Count", provider: "LabCorp", date: "Oct 12, 2023", type: "Lab Result" },
                { name: "Lipid Panel", provider: "LabCorp", date: "Oct 12, 2023", type: "Lab Result" },
                { name: "Prescription: Lisinopril", provider: "Dr. Sarah Chen", date: "Oct 15, 2023", type: "Prescription" },
                { name: "Dermatology Consult", provider: "Dr. James Wilson", date: "Sep 28, 2023", type: "Visit Note" },
                { name: "Metabolic Panel", provider: "Quest Diagnostics", date: "Sep 05, 2023", type: "Lab Result" },
              ].map((record, i) => (
                <tr key={i} className="hover:bg-[#18181A]/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-bold flex items-center gap-3">
                    <div className="grid size-8 place-items-center bg-[#E9D5FF]/30 rounded-md">
                      <FileText className="size-4 text-[#0B392A]" />
                    </div>
                    {record.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-[#18181A]/70">{record.provider}</td>
                  <td className="px-6 py-4 font-medium text-[#18181A]/70">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-[#18181A]/5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#18181A]/60">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-[#0B392A] hover:bg-[#0B392A]/10 transition-colors opacity-0 group-hover:opacity-100">
                      <Download className="size-3.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
