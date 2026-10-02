// TODO: Expenses — list, filter, and add one-off expenses (rent, utilities, groceries, Venmos).
import Link from "next/link";

import { ExpenseList } from "@/components/expense/ExpenseList";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/constants";
import { EXPENSES } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import type { ExpenseCategory } from "@/types";

export default async function ExpensesPage(
  props: PageProps<"/dashboard/expenses">,
) {
  const { category } = await props.searchParams;

  const selected =
    typeof category === "string" && category in CATEGORIES
      ? (category as ExpenseCategory)
      : undefined;

  const expenses = selected
    ? EXPENSES.filter((e) => e.category === selected)
    : EXPENSES;

  const total = expenses.reduce((sum, e) => sum + e.amountCents, 0);

  const chipStyles = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-xs font-medium transition",
      active
        ? "border-accent bg-accent-soft text-accent"
        : "border-border text-muted hover:bg-bg hover:text-fg",
    );

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        title="Expenses"
        subtitle={`${expenses.length} ${
          expenses.length === 1 ? "expense" : "expenses"
        } · ${formatCurrency(total)} total`}
      />

      <div className="flex flex-wrap gap-2">
        <Link
          href="/dashboard/expenses"
          className={chipStyles(selected === undefined)}
        >
          All
        </Link>
        {(Object.keys(CATEGORIES) as ExpenseCategory[]).map((key) => (
          <Link
            key={key}
            href={`/dashboard/expenses?category=${key}`}
            className={chipStyles(selected === key)}
          >
            {CATEGORIES[key].label}
          </Link>
        ))}
      </div>

      <Card>
        <ExpenseList expenses={expenses} />
      </Card>
    </main>
  );
}