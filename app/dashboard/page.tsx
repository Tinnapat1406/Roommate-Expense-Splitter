import Link from "next/link";

import { BalanceSummary } from "@/components/balances/balance-summary";
import { ExpenseList } from "@/components/expenses/expense-list";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";
import { CATEGORIES, RECURRENCE_INTERVALS } from "@/lib/constants";
import {
  BALANCES,
  CURRENT_USER,
  EXPENSES,
  MONTH_TOTAL_CENTS,
  RECURRING_RULES,
  YOUR_SHARE_CENTS,
} from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const yourBalance =
  BALANCES.find((balance) => balance.memberId === CURRENT_USER.id)?.netCents ??
  0;

function Stat({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  return (
    <Card className="p-5">
      <p className="text-xs text-muted">{label}</p>
      <p
        className={cn(
          "tnum mt-1.5 text-2xl font-semibold tracking-tight",
          tone === "positive" && "text-positive",
          tone === "negative" && "text-negative",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </Card>
  );
}

export default function DashboardPage() {
  const upcoming = RECURRING_RULES.filter((rule) => rule.active).slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Hey {CURRENT_USER.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s where the household stands this month.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="You are owed"
          value={formatCurrency(Math.max(yourBalance, 0))}
          hint="Across 3 roommates"
          tone="positive"
        />
        <Stat
          label="You owe"
          value={formatCurrency(Math.max(-yourBalance, 0))}
          hint="Nothing outstanding"
        />
        <Stat
          label="Household spend"
          value={formatCurrency(MONTH_TOTAL_CENTS)}
          hint={`Your share ${formatCurrency(YOUR_SHARE_CENTS)}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div>
              <CardTitle>Recent expenses</CardTitle>
              <CardDescription>Latest activity in the household</CardDescription>
            </div>
            <Link
              href="/dashboard/expenses"
              className={buttonStyles({ variant: "ghost", size: "sm" })}
            >
              View all
            </Link>
          </CardHeader>
          <ExpenseList expenses={EXPENSES.slice(0, 5)} />
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Balances</CardTitle>
                <CardDescription>Who owes whom right now</CardDescription>
              </div>
            </CardHeader>
            <BalanceSummary />
            <CardFooter>
              <Link
                href="/dashboard/balances"
                className={buttonStyles({ size: "sm", className: "w-full" })}
              >
                Settle up
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Coming up</CardTitle>
                <CardDescription>Charges we&apos;ll add for you</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 p-0">
              <ul className="divide-y divide-border">
                {upcoming.map((rule) => (
                  <li
                    key={rule.id}
                    className="flex items-center gap-3 px-5 py-3"
                  >
                    <Icon
                      name={CATEGORIES[rule.category].icon}
                      className="size-4 text-muted"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{rule.description}</p>
                      <p className="text-xs text-muted">
                        {formatDate(rule.nextDueDate)} ·{" "}
                        {RECURRENCE_INTERVALS[rule.interval].toLowerCase()}
                      </p>
                    </div>
                    <span className="tnum text-sm font-medium">
                      {formatCurrency(rule.amountCents)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <Badge tone="accent">
                <Icon name="repeat" className="size-3" />
                Automatic
              </Badge>
              <span className="text-xs text-muted">
                Added and split on the due date
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
