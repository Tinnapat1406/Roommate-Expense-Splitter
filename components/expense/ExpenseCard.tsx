import { CategoryBadge } from "@/components/expense/CategoryBadge";
import { personalImpact } from "@/lib/balances";
import { CURRENT_USER, memberById } from "@/lib/mock-data";
import { displayName, formatCurrency, formatDate } from "@/lib/utils";
import type { Expense } from "@/types";


export function ExpenseCard({ expense }: { expense: Expense }) {
  const payer = memberById(expense.paidBy);
  const impact = personalImpact(expense, CURRENT_USER.id);

  return (
    <li className="flex items-center gap-4 px-5 py-3.5">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{expense.description}</p>
          <CategoryBadge category={expense.category} />
        </div>
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
}
