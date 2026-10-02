// TODO: Balances — per-roommate net balance and settle-up flow.
import { BalanceCard } from "@/components/balance/BalanceCard";
import { TransferCard } from "@/components/balance/TransferCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { simplifyDebts } from "@/lib/balances";
import { BALANCES } from "@/lib/mock-data";

export default function BalancesPage() {
  const transfers = simplifyDebts(BALANCES);
  const maxCents = Math.max(...BALANCES.map((b) => Math.abs(b.netCents)), 0);

  const sorted = [...BALANCES].sort((a, b) => b.netCents - a.netCents);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-6">
      <PageHeader
        title="Balances"
        subtitle={
          transfers.length === 0
            ? "Everyone's square."
            : `${transfers.length} payments clear every debt in the house.`
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Who owes whom" />
          <ul className="divide-y divide-border">
            {sorted.map((balance) => (
              <BalanceCard
                key={balance.memberId}
                balance={balance}
                maxCents={maxCents}
              />
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Suggested payments" />
          {transfers.length === 0 ? (
            <EmptyState
              title="Nothing to settle"
              description="Every balance is at zero."
            />
          ) : (
            <ul className="divide-y divide-border">
              {transfers.map((transfer) => (
                <TransferCard
                  key={`${transfer.fromMemberId}-${transfer.toMemberId}`}
                  transfer={transfer}
                />
              ))}
            </ul>
          )}
        </Card>
      </div>
    </main>
  );
}

