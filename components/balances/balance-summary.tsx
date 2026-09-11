import { Avatar } from "@/components/ui/avatar";
import { BALANCES, memberById } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

/** Widest bar = largest absolute balance, so the bars stay comparable. */
function widthFor(netCents: number) {
  const max = Math.max(...BALANCES.map((b) => Math.abs(b.netCents)));
  return `${Math.round((Math.abs(netCents) / max) * 100)}%`;
}

export function BalanceSummary() {
  return (
    <ul className="divide-y divide-border">
      {BALANCES.map((balance) => {
        const member = memberById(balance.memberId);
        const owed = balance.netCents > 0;

        return (
          <li key={balance.memberId} className="flex items-center gap-3 px-5 py-3.5">
            <Avatar name={member.name} size="sm" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {member.isCurrentUser ? "You" : member.name}
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg">
                <div
                  className={cn(
                    "h-full rounded-full",
                    owed ? "bg-positive" : "bg-negative",
                  )}
                  style={{ width: widthFor(balance.netCents) }}
                />
              </div>
            </div>

            <div className="text-right">
              <p
                className={cn(
                  "tnum text-sm font-semibold",
                  owed ? "text-positive" : "text-negative",
                )}
              >
                {owed ? "+" : "−"}
                {formatCurrency(Math.abs(balance.netCents))}
              </p>
              <p className="text-xs text-muted">
                {owed ? "is owed" : "owes"}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
