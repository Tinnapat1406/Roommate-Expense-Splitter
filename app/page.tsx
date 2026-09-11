import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icons";
import { MEMBERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const FEATURES: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "repeat",
    title: "Recurring on autopilot",
    body: "Rent, internet, and the cleaner get added and split on their due date. Nobody has to remember.",
  },
  {
    icon: "scale",
    title: "Balances that simplify",
    body: "Four roommates, six expenses, three payments. We collapse the web of IOUs into the fewest transfers.",
  },
  {
    icon: "card",
    title: "Settle in one tap",
    body: "Pay a roommate back with a card through Stripe, or mark it settled if cash already changed hands.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5">
        <span className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg">
            <Icon name="scale" className="size-4.5" />
          </span>
          Splitmate
        </span>
        <nav className="ml-auto flex items-center gap-2">
          <Link
            href="/login"
            className={buttonStyles({ variant: "ghost", size: "sm" })}
          >
            Log in
          </Link>
          <Link href="/signup" className={buttonStyles({ size: "sm" })}>
            Get started
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-5 py-16">
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted">
              <Icon name="sparkle" className="size-3.5 text-accent" />
              Built for houses that split everything
            </span>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Stop doing rent math in the group chat.
            </h1>

            <p className="max-w-md text-base text-muted text-pretty">
              Split rent, utilities, groceries, and random Venmos automatically.
              Recurring charges post themselves, balances stay current, and
              everyone can see exactly what they owe.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/signup" className={buttonStyles({ size: "lg" })}>
                Start splitting
                <Icon name="arrowRight" className="size-4" />
              </Link>
              <Link
                href="/dashboard"
                className={buttonStyles({ variant: "secondary", size: "lg" })}
              >
                See the demo
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex -space-x-2">
                {MEMBERS.map((member) => (
                  <Avatar
                    key={member.id}
                    name={member.name}
                    size="sm"
                    className="ring-2 ring-bg"
                  />
                ))}
              </span>
              <span className="text-xs text-muted">
                Apt 4B settled up in 3 payments this month
              </span>
            </div>
          </div>

          {/* A miniature of the real balances card. */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">This month</span>
              <span className="text-xs text-muted">September</span>
            </div>

            <p className="tnum mt-4 text-3xl font-semibold tracking-tight">
              {formatCurrency(330010)}
            </p>
            <p className="mt-1 text-xs text-muted">
              across 6 expenses · your share {formatCurrency(82503)}
            </p>

            <ul className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
              {[
                { label: "September rent", amount: 280000, icon: "home" },
                { label: "PG&E — August", amount: 14250, icon: "bolt" },
                { label: "Costco run", amount: 18740, icon: "cart" },
              ].map((row) => (
                <li key={row.label} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-bg text-muted">
                    <Icon name={row.icon as IconName} className="size-4" />
                  </span>
                  <span className="flex-1 text-sm">{row.label}</span>
                  <span className="tnum text-sm font-medium">
                    {formatCurrency(row.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between rounded-lg bg-positive-soft px-3 py-2.5">
              <span className="text-xs font-medium text-positive">
                You are owed
              </span>
              <span className="tnum text-sm font-semibold text-positive">
                {formatCurrency(64350)}
              </span>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="flex flex-col gap-3 p-5">
              <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <Icon name={feature.icon} className="size-4.5" />
              </span>
              <h2 className="text-sm font-semibold">{feature.title}</h2>
              <p className="text-sm text-muted text-pretty">{feature.body}</p>
            </Card>
          ))}
        </section>

        <section className="flex flex-col items-center gap-5 rounded-xl border border-border bg-surface px-6 py-14 text-center">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-balance">
            Your rent is due on the 1st whether you&apos;ve done the math or not.
          </h2>
          <Link href="/signup" className={buttonStyles({ size: "lg" })}>
            Create your household
          </Link>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-5xl px-5 py-6 text-xs text-muted">
          Splitmate · Next.js, Supabase, and Stripe
        </div>
      </footer>
    </div>
  );
}
