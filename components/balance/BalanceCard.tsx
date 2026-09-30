// TODO: Net position for one member.
import { MemberAvatar } from "@/components/member/MemberAvatar";
import { memberById } from "@/lib/mock-data";
import { cn, displayName, formatCurrency } from "@/lib/utils";
import type { Balance } from "@/types";


export function BalanceCard({
  balance,
  maxCents,
}: {
  balance: Balance;
  /** Largest absolute balance in the household, so bars stay comparable. */
  maxCents: number;
}) {
  const member = memberById(balance.memberId);
  const owed = balance.netCents > 0;
  const settled = balance.netCents === 0;
  const width = maxCents === 0 ? 0 : (Math.abs(balance.netCents) / maxCents) * 100;

  return (
    <li className="flex items-center gap-3 px-5 py-3.5">
      <MemberAvatar member={member} size="sm" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{displayName(member)}</p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg">
          <div
            className={cn(
              "h-full rounded-full",
              owed ? "bg-positive" : "bg-negative",
            )}
            style={{ width: `${width}%` }}
          />
        </div>
      </div>

      <div className="text-right">
        <p
          className={cn(
            "tnum text-sm font-semibold",
            settled ? "text-muted" : owed ? "text-positive" : "text-negative",
          )}
        >
          {settled ? "—" : owed ? "+" : "−"}
          {settled ? "" : formatCurrency(Math.abs(balance.netCents))}
        </p>
        <p className="text-xs text-muted">
          {settled ? "settled" : owed ? "is owed" : "owes"}
        </p>
      </div>
    </li>
  );
}