import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";
import { BALANCES, CURRENT_USER, EXPENSES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function Dashboard() {
  const monthTotal = EXPENSES.reduce((sum, e) => sum + e.amountCents, 0);

  const yourShare = EXPENSES.reduce(
    (sum, e) =>
      sum +
      (e.splits.find((s) => s.memberId === CURRENT_USER.id)?.amountCents ?? 0),
    0,
  );

  const unsettled = BALANCES.filter(
    (b) => b.memberId !== CURRENT_USER.id && b.netCents !== 0,
  ).length;

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <NetBalanceCard />

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Household spend"
          value={formatCurrency(monthTotal)}
          context="September"
        />
        <SummaryCard
          label="Your share"
          value={formatCurrency(yourShare)}
          context={`of ${formatCurrency(monthTotal)}`}
        />
        <SummaryCard
          label="Unsettled"
          value={String(unsettled)}
          context={unsettled === 1 ? "payment pending" : "payments pending"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <UpcomingBills />
      </div>

      <SpendingChart />
    </main>
  );
}
