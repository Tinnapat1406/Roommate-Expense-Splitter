"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/ui/icons";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  // "/dashboard" would otherwise light up on every child route.
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 px-5 py-5 font-semibold tracking-tight"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg">
          <Icon name="scale" className="size-4.5" />
        </span>
        Splitmate
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
              isActive(pathname, item.href)
                ? "bg-accent-soft font-medium text-accent"
                : "text-muted hover:bg-bg hover:text-fg",
            )}
          >
            <Icon name={item.icon} className="size-4.5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-bg hover:text-fg"
        >
          <Icon name="logout" className="size-4.5" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
