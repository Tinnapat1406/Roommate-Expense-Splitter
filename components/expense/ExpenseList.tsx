// TODO: Expense list with filters.
import { ExpenseCard } from "@/components/expense/ExpenseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Expense } from "@/types";

export function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <EmptyState
        title="Nothing here"
        description="No expenses match this filter."
      />
    );
  }

  return (
    <ul className="divide-y divide-border">
      {[...expenses]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
    </ul>
  );
}
