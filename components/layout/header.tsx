import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { buttonStyles } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { NAV_ITEMS } from "@/lib/constants";
import { CURRENT_USER, HOUSEHOLD } from "@/lib/mock-data";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/85 backdrop-blur">
      <div className="flex items-center gap-4 px-5 py-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition hover:bg-bg"
        >
          <Icon name="users" className="size-4 text-muted" />
          {HOUSEHOLD.name}
          <Icon name="chevronDown" className="size-4 text-muted" />
        </button>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/dashboard/expenses"
            className={buttonStyles({ size: "sm" })}
          >
            <Icon name="plus" className="size-4" />
            Add expense
          </Link>
          <Avatar name={CURRENT_USER.name} />
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
