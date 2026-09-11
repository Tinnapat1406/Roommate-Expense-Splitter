import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icons";
import { CATEGORIES } from "@/lib/constants";
import { CURRENT_USER, displayName, memberById } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Expense } from "@/types";

function yourShare(expense: Expense) {
  return (
    expense.splits.find((split) => split.memberId === CURRENT_USER.id)
      ?.amountCents ?? 0
  );
}

export function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <p className="px-5 py-10 text-center text-sm text-muted">
        No expenses yet. Add the first one to get started.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {expenses.map((expense) => {
        const category = CATEGORIES[expense.category];
        const payer = memberById(expense.paidBy);
        const paidByYou = payer.id === CURRENT_USER.id;

        return (
          <li
            key={expense.id}
            className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-bg"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-bg text-muted">
              <Icon name={category.icon} className="size-4.5" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium">
                  {expense.description}
                </p>
                {expense.recurringRuleId && (
                  <Badge tone="accent">
                    <Icon name="repeat" className="size-3" />
                    Auto
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted">
                {formatDate(expense.date)} · {category.label} ·{" "}
                {displayName(payer.id)} paid
              </p>
            </div>

            <div className="hidden sm:block">
              <Avatar name={payer.name} size="sm" />
            </div>

            <div className="text-right">
              <p className="tnum text-sm font-semibold">
                {formatCurrency(expense.amountCents)}
              </p>
              <p className="tnum text-xs text-muted">
                {paidByYou ? "you lent " : "your share "}
                {formatCurrency(
                  paidByYou
                    ? expense.amountCents - yourShare(expense)
                    : yourShare(expense),
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
