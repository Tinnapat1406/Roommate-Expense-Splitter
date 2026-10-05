// TODO: Upcoming charges laid out on a timeline.
import { CategoryBadge } from "@/components/expense/CategoryBadge";
import { MemberAvatar } from "@/components/member/MemberAvatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { memberById } from "@/lib/mock-data";
import { daysAway, type ForecastEntry } from "@/lib/recurring";
import { RECURRENCE_INTERVALS } from "@/lib/constants";
import { dateChip, displayName, formatCurrency } from "@/lib/utils";

function whenLabel(days: number) {
  if (days <= 0) return "due today";
  if (days === 1) return "tomorrow";
  if (days <= 7) return `in ${days} days`;
  return `in ${Math.round(days / 7)} weeks`;
}

export function ForecastTimeline({ entries }: { entries: ForecastEntry[] }) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Nothing scheduled"
        description="Add a recurring rule and it'll post itself on the due date."
      />
    );
  }

  return (
    <ul className="divide-y divide-border">
      {entries.map(({ rule, date }) => {
        const chip = dateChip(date.toISOString());
        const payer = memberById(rule.paidBy);

        return (
          <li
            key={`${rule.id}-${date.toISOString()}`}
            className="flex items-center gap-3 px-5 py-3.5"
          >
            <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-bg">
              <span className="text-[10px] leading-none text-muted">
                {chip.month}
              </span>
              <span className="tnum text-sm leading-tight font-semibold">
                {chip.day}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium">
                  {rule.description}
                </p>
                <CategoryBadge category={rule.category} />
              </div>
              <p className="mt-0.5 text-xs text-muted">
                {whenLabel(daysAway(date))} ·{" "}
                {RECURRENCE_INTERVALS[rule.interval].toLowerCase()} ·{" "}
                {displayName(payer)} pays
              </p>
            </div>

            <MemberAvatar member={payer} size="sm" />

            <span className="tnum text-sm font-semibold">
              {formatCurrency(rule.amountCents)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

