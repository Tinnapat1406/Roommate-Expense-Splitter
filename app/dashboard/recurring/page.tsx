import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";
import { CATEGORIES, RECURRENCE_INTERVALS } from "@/lib/constants";
import { RECURRING_RULES, memberById } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/utils";

export default function RecurringPage() {
  const active = RECURRING_RULES.filter((rule) => rule.active);
  const monthlyTotal = active.reduce(
    (total, rule) =>
      total + (rule.interval === "biweekly" ? rule.amountCents * 2 : rule.amountCents),
    0,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Recurring</h1>
          <p className="mt-1 text-sm text-muted">
            Charges that get added and split on their own, roughly{" "}
            <span className="tnum">{formatCurrency(monthlyTotal)}</span> a month.
          </p>
        </div>
        <Button>
          <Icon name="plus" className="size-4" />
          New rule
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {RECURRING_RULES.map((rule) => {
          const payer = memberById(rule.paidBy);

          return (
            <Card key={rule.id} className={rule.active ? "" : "opacity-60"}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-bg text-muted">
                    <Icon
                      name={CATEGORIES[rule.category].icon}
                      className="size-4.5"
                    />
                  </span>
                  <div>
                    <CardTitle>{rule.description}</CardTitle>
                    <p className="mt-0.5 text-xs text-muted">
                      {RECURRENCE_INTERVALS[rule.interval]}
                    </p>
                  </div>
                </div>
                <Badge tone={rule.active ? "positive" : "neutral"}>
                  {rule.active ? "Active" : "Paused"}
                </Badge>
              </CardHeader>

              <div className="flex items-end justify-between px-5 py-4">
                <div className="flex flex-col gap-2">
                  <span className="tnum text-2xl font-semibold tracking-tight">
                    {formatCurrency(rule.amountCents)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="calendar" className="size-3.5" />
                    Next {formatLongDate(rule.nextDueDate)}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Avatar name={payer.name} size="sm" />
                  <span className="text-xs text-muted">
                    {payer.isCurrentUser ? "You" : payer.name.split(" ")[0]} pays
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
