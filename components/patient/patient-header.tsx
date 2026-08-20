import { Bell, Search } from "lucide-react";

export function PatientHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#18181A]/10 bg-[#FDFBF2] px-6 lg:px-10">
      
      {/* Search Bar */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#18181A]/50" />
          <input
            type="text"
            placeholder="Search doctors, records, or health topics..."
            className="h-10 w-full rounded-full border border-[#18181A]/10 bg-[#FDFBF2] pl-9 pr-4 text-sm focus:border-[#0B392A] focus:outline-none focus:ring-1 focus:ring-[#0B392A] transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative grid size-10 place-items-center rounded-full text-[#18181A]/70 hover:bg-[#18181A]/5 transition-colors">
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2.5 flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
          </span>
        </button>
        
        <button className="hidden sm:flex items-center gap-2 rounded-full border border-[#18181A]/10 bg-[#FDFBF2] px-4 py-2 text-sm font-bold text-[#18181A] hover:bg-[#18181A]/5 transition-colors">
          Emergency Info
        </button>
      </div>
    </header>
  );
}
