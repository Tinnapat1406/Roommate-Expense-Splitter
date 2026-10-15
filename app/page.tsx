// TODO: Landing page — pitch, screenshot, sign-up CTA.
// git clone https://github.com/Tinnapat1406/Roommate-Expense-Splitter.git
// cd Roommate-Expense-Splitter
// npm install
// cp .env.example .env.local
// npm run dev
import Link from "next/link";

import { MemberAvatar } from "@/components/member/MemberAvatar";
import { Card } from "@/components/ui/Card";
import { MEMBERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const FEATURES = [
  {
    title: "Recurring on autopilot",
    body: "Rent, internet, and the cleaner post themselves on their due date and split automatically. Nobody has to remember.",
  },
  {
    title: "Balances that simplify",
    body: "Four roommates and a tangle of IOUs collapse into the three payments that actually clear the house.",
  },
  {
    title: "Settle in one tap",
    body: "Pay a roommate back by card, or mark it settled when cash already changed hands.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-5">
        <span className="font-semibold tracking-tight">Splitmate</span>
        <nav className="ml-auto flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg px-3 py-1.5 text-sm text-muted transition hover:bg-bg hover:text-fg"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-5 py-16">
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Stop doing rent math in the group chat.
            </h1>

            <p className="max-w-md text-base text-muted text-pretty">
              Split rent, utilities, groceries, and random Venmos automatically.
              Recurring charges post themselves, balances stay current, and
              everyone sees exactly what they owe.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-fg transition hover:opacity-90"
              >
                Start splitting
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border border-border px-6 py-3 text-base font-medium transition hover:bg-bg"
              >
                See the demo
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex -space-x-2">
                {MEMBERS.map((member) => (
                  <MemberAvatar
                    key={member.id}
                    member={member}
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

          {/* A miniature of the real dashboard hero. */}
          <Card className="p-6">
            <p className="text-sm text-muted">You are owed</p>
            <p className="tnum mt-1 font-semibold tracking-tight text-hero text-positive">
              {formatCurrency(64350)}
            </p>

            <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
              {[
                ["September rent", 280000],
                ["PG&E — August", 14250],
                ["Costco run", 18740],
              ].map(([label, cents]) => (
                <li key={label as string} className="flex items-center gap-3">
                  <span className="flex-1 text-sm">{label}</span>
                  <span className="tnum text-sm font-medium">
                    {formatCurrency(cents as number)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="flex flex-col gap-2 p-5">
              <h2 className="text-sm font-semibold">{feature.title}</h2>
              <p className="text-sm text-muted text-pretty">{feature.body}</p>
            </Card>
          ))}
        </section>

        <section className="flex flex-col items-center gap-5 rounded-xl border border-border bg-surface px-6 py-14 text-center">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-balance">
            Your rent is due on the 1st whether you&apos;ve done the math or not.
          </h2>
          <Link
            href="/signup"
            className="rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-fg transition hover:opacity-90"
          >
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
