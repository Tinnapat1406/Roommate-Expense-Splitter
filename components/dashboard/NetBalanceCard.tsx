// TODO: The hero number — am I square?
import Link from "next/link";
import { MemberAvatar } from "@/components/member/MemberAvatar";
import { Card } from "@/components/ui/Card";
import { BALANCES,CURRENT_USER,MEMBERS } from "@/lib/mock-data";
import { cn,formatCurrency } from "@/lib/utils";

export function NetBalanceCard() {
  const net = 
    BALANCES.find((b) => b.memberId === CURRENT_USER.id)?.netCents ?? 0;

  const others = MEMBERS.filter((m) => !m.isCurrentUser);
  const settled = net === 0;

  return (
    <Card className="flex flex-wrap items-center justify-between gap-6 p-7">
      <div>
        <p className="text-sm text-muted">
          {settled ? "All settled up" : net > 0 ? "You are owed" : "You owe"}
        </p>

        <p className={cn(
            "tnum mt-1 font-semibold tracking-tight text-hero",
            settled ? "text-fg" : net > 0 ? "text-positive" : "text-negative",
          )}>
            {settled ? "You're all square" : formatCurrency(Math.abs(net))}
        </p>

        {!settled && (
          <div className="mt-3 flex items-center gap-2">
            <span className="flex -space-x-2">
              {others.map((member) => (
                <MemberAvatar
                  key={member.id}
                  member={member}
                  size="sm"
                  className="ring-2 ring-surface"
                />
              ))}
            </span>
            <span className="text-[13px] text-muted">
              {net > 0 ? "from" : "to"} {others.length} roommates
            </span>
          </div>
        )}
      </div>

      <Link
        href="/dashboard/balances"
        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
      >
        Settle up
      </Link>
    </Card>
  )
}