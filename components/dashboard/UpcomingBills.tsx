// TODO: What's about to hit, from recurring rules.
import { Badge } from "@/components/ui/Badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CURRENT_USER, MEMBERS, RECURRING_RULES } from "@/lib/mock-data";
import { dateChip, formatCurrency } from "@/lib/utils";
import type { RecurringRule } from "@/types";

const DAY_MS = 86_400_000;

/** Equal split for now — swap for lib/splitting.ts when it exists. */
function yourShareOf(rule: RecurringRule) {
  return Math.floor(rule.amountCents / MEMBERS.length);
}

function daysAway(date: string) {
  const due = new Date(date).getTime();
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((due - today) / DAY_MS);
}

export function UpcomingBills() {
  const upcoming = RECURRING_RULES.filter((rule) => rule.active)
    .filter((rule) => daysAway(rule.nextDueDate) <= 30)
    .sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));

  const total = upcoming.reduce((sum, rule) => sum + rule.amountCents, 0);
  const yourTotal = upcoming.reduce((sum, rule) => sum + yourShareOf(rule), 0);

  return (
    <Card className="flex flex-col">
      <CardHeader title="Upcoming" action={<Badge tone="accent">Automatic</Badge>} />

      {upcoming.length === 0 ? (
        <EmptyState
          title="Nothing scheduled"
          description="Set up rent or utilities and they'll post themselves."
        />
      ) : (
        <ul className="flex-1 divide-y divide-border">
          {upcoming.map((rule) => {
            const chip = dateChip(rule.nextDueDate);
            const days = daysAway(rule.nextDueDate);

            return (
              <li key={rule.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-bg">
                  <span className="text-[10px] leading-none text-muted">
                    {chip.month}
                  </span>
                  <span className="tnum text-sm leading-tight font-semibold">
                    {chip.day}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {rule.description}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {days <= 0 ? "due today" : days === 1 ? "tomorrow" : `in ${days} days`}
                  </p>
                </div>

                <div className="text-right">
                  <p className="tnum text-sm font-semibold">
                    {formatCurrency(rule.amountCents)}
                  </p>
                  <p className="tnum mt-0.5 text-xs text-muted">
                    your share {formatCurrency(yourShareOf(rule))}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {upcoming.length > 0 && (
        <CardFooter className="flex items-center justify-between">
          <span>Next 30 days</span>
          <span className="tnum font-medium text-fg">
            {formatCurrency(total)} · you {formatCurrency(yourTotal)}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}

