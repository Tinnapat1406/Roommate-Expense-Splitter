// TODO: Top bar — household switcher, add-expense, user menu.
import Link from "next/link";

import { MemberAvatar } from "@/components/member/MemberAvatar";
import { NAV_ITEMS } from "@/lib/constants";
import { CURRENT_USER, HOUSEHOLD } from "@/lib/mock-data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/85 backdrop-blur">
      <div className="flex items-center gap-4 px-5 py-3">
        {/* TODO: household switcher once there's more than one. */}
        <span className="text-sm font-medium">{HOUSEHOLD.name}</span>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/dashboard/expenses"
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition hover:opacity-90"
          >
            Add expense
          </Link>
          <MemberAvatar member={CURRENT_USER} />
        </div>
      </div>

      {/* The sidebar is hidden below lg, so nav collapses into this row. */}
      <nav className="flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-1.5 text-sm whitespace-nowrap text-muted transition hover:bg-bg hover:text-fg"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

