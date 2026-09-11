import Link from "next/link";

import { Icon } from "@/components/ui/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2.5 text-lg font-semibold tracking-tight"
      >
        <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-fg">
          <Icon name="scale" className="size-5" />
        </span>
        Splitmate
      </Link>

      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
