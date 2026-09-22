// TODO: Latest expenses and settlements.
import Link from "next/link";

import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CURRENT_USER, EXPENSES, memberById } from "@/lib/mock-data";
import { displayName, formatCurrency, formatDate } from "@/lib/utils";
import type { Expense, PersonalImpact } from "@/types";

function impactFor(expense: Expense) : PersonalImpact {
  const myShare = 
  expense.splits.find((s) => s.memberId === CURRENT_USER.id)?.amountCents ?? 0;

  return expense.paidBy === CURRENT_USER.id
  ? {kind: "lent",amountCents: expense.amountCents - myShare }
  : {kind: "owe", amountCents: myShare};
}

export function RecentActivity() {
  const recent = [...EXPENSES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
  
    return(
      <Card>
        <CardHeader
          title="Recent activity"
          action={
            <Link
              href="/dashboard/expenses"
              className="text-xs font-medium text-accent hover:underline">
              View all →
          </Link>}/>

          {recent.length === 0 ? (
        <EmptyState
          title="No expenses yet"
          description="Add the first one and it'll show up here."
        />
      ) : (
        <ul className="divide-y divide-border">
          {recent.map((expense) => {
            const payer = memberById(expense.paidBy);
            const impact = impactFor(expense);

            return (
              <li
                key={expense.id}
                className="flex items-center gap-4 px-5 py-3.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {expense.description}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {formatDate(expense.date)} · {displayName(payer)} paid
                  </p>
                </div>

                <div className="text-right">
                  <p className="tnum text-sm font-semibold">
                    {formatCurrency(expense.amountCents)}
                  </p>
                  <p className="tnum mt-0.5 text-xs text-muted">
                    {impact.kind === "lent" ? "you lent " : "your share "}
                    {formatCurrency(impact.amountCents)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      </Card>
    );
  }
