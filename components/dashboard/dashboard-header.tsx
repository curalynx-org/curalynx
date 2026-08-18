import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-card/80 backdrop-blur-sm px-6 py-3.5 sm:px-8">
      <button className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors md:hidden">
        <Menu className="size-5" />
      </button>

      <div className="flex flex-1 items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients, records..."
            className="h-10 w-full rounded-xl border border-border bg-muted/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Bell className="size-[18px]" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
        </button>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-3 transition-colors hover:bg-muted"
        >
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            DR
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-tight">Dr. Rao</p>
            <p className="text-[11px] text-muted-foreground">Clinic Admin</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
