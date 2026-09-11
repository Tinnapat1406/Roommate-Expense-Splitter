import { ExpenseForm } from "@/components/expenses/expense-form";
import { ExpenseList } from "@/components/expenses/expense-list";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants";
import { EXPENSES, MONTH_TOTAL_CENTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { ExpenseCategory } from "@/types";

export default function ExpensesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Expenses</h1>
          <p className="mt-1 text-sm text-muted">
            {EXPENSES.length} this month ·{" "}
            <span className="tnum">{formatCurrency(MONTH_TOTAL_CENTS)}</span>{" "}
            total
          </p>
        </div>
      </div>

      {/* TODO: make these filter the list via searchParams. */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
        >
          All
        </button>
        {(Object.keys(CATEGORIES) as ExpenseCategory[]).map((key) => (
          <button
            key={key}
            type="button"
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition hover:bg-bg hover:text-fg"
          >
            {CATEGORIES[key].label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>September 2026</CardTitle>
          </CardHeader>
          <ExpenseList expenses={EXPENSES} />
        </Card>

        <Card className="h-fit lg:col-span-2">
          <CardHeader>
            <CardTitle>Add an expense</CardTitle>
          </CardHeader>
          <div className="px-5 py-4">
            <ExpenseForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
