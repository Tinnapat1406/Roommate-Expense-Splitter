import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">

      <NetBalanceCard />

      <SummaryCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />
        <UpcomingBills />
      </div>

      <SpendingChart />

    </main>
  );
}
