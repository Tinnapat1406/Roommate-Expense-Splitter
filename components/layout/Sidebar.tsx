// TODO: Primary navigation.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  // "/dashboard" prefix-matches every child route, so it needs an exact test.
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <Link
        href="/dashboard"
        className="px-5 py-5 text-sm font-semibold tracking-tight"
      >
        Splitmate
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition",
              isActive(pathname, item.href)
                ? "bg-accent-soft font-medium text-accent"
                : "text-muted hover:bg-bg hover:text-fg",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3">
        <Link
          href="/login"
          className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-bg hover:text-fg"
        >
          Log out
        </Link>
      </div>
    </aside>
  );
}
