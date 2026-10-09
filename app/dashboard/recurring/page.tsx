// TODO: Recurring — manage repeating charges (schedule, amount, split rule).
import { ForecastCard } from "@/components/forecast/ForecastCard";
import { ForecastTimeline } from "@/components/forecast/ForecastTimeline";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { RECURRENCE_INTERVALS } from "@/lib/constants";
import { RECURRING_RULES } from "@/lib/mock-data";
import { forecast } from "@/lib/recurring";
import { formatCurrency } from "@/lib/utils";


const WINDOW_DAYS = 30;

export default function RecurringPage() {
  const entries = forecast(RECURRING_RULES, WINDOW_DAYS);
  const paused = RECURRING_RULES.filter((rule) => !rule.active);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        title="Recurring"
        subtitle="Charges that add and split themselves on their due date."
      />

      <ForecastCard entries={entries} days={WINDOW_DAYS} />

      <Card>
        <CardHeader
          title="Coming up"
          action={<Badge tone="accent">Automatic</Badge>}
        />
        <ForecastTimeline entries={entries} />
      </Card>

      {paused.length > 0 && (
        <Card>
          <CardHeader title="Paused" />
          <ul className="divide-y divide-border">
            {paused.map((rule) => (
              <li
                key={rule.id}
                className="flex items-center gap-3 px-5 py-3.5 opacity-60"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {rule.description}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {RECURRENCE_INTERVALS[rule.interval]}
                  </p>
                </div>
                <span className="tnum text-sm font-semibold">
                  {formatCurrency(rule.amountCents)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </main>
  );
}
