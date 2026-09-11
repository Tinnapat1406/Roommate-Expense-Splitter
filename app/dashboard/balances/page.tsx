import { BalanceSummary } from "@/components/balances/balance-summary";
import { SettleUpDialog } from "@/components/balances/settle-up-dialog";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";
import {
  SETTLEMENTS,
  SUGGESTED_TRANSFERS,
  displayName,
  memberById,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BalancesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Balances</h1>
        <p className="mt-1 text-sm text-muted">
          {SUGGESTED_TRANSFERS.length} payments clear every debt in the house.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Who owes whom</CardTitle>
                <CardDescription>Net position per roommate</CardDescription>
              </div>
            </CardHeader>
            <BalanceSummary />
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Suggested payments</CardTitle>
                <CardDescription>
                  The fewest transfers that settle everything
                </CardDescription>
              </div>
            </CardHeader>
            <ul className="divide-y divide-border">
              {SUGGESTED_TRANSFERS.map((transfer) => (
                <li
                  key={`${transfer.fromMemberId}-${transfer.toMemberId}`}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <Avatar
                    name={memberById(transfer.fromMemberId).name}
                    size="sm"
                  />
                  <Icon name="arrowRight" className="size-4 text-muted" />
                  <Avatar
                    name={memberById(transfer.toMemberId).name}
                    size="sm"
                  />
                  <p className="flex-1 text-sm">
                    {displayName(transfer.fromMemberId)} pays{" "}
                    {displayName(transfer.toMemberId).toLowerCase()}
                  </p>
                  <span className="tnum text-sm font-semibold">
                    {formatCurrency(transfer.amountCents)}
                  </span>
                  <Button variant="secondary" size="sm">
                    Remind
                  </Button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Payment history</CardTitle>
                <CardDescription>Settlements between roommates</CardDescription>
              </div>
            </CardHeader>
            <ul className="divide-y divide-border">
              {SETTLEMENTS.map((settlement) => (
                <li
                  key={settlement.id}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-bg text-muted">
                    <Icon name="card" className="size-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      {displayName(settlement.fromMemberId)} →{" "}
                      {displayName(settlement.toMemberId).toLowerCase()}
                    </p>
                    <p className="text-xs text-muted">
                      {formatDate(settlement.date)}
                    </p>
                  </div>
                  <Badge
                    tone={
                      settlement.status === "completed" ? "positive" : "neutral"
                    }
                  >
                    {settlement.status}
                  </Badge>
                  <span className="tnum text-sm font-medium">
                    {formatCurrency(settlement.amountCents)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <SettleUpDialog transfer={SUGGESTED_TRANSFERS[0]} />
        </div>
      </div>
    </div>
  );
}
