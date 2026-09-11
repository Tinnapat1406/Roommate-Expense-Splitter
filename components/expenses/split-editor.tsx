import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/field";
import { SPLIT_TYPES } from "@/lib/constants";
import { MEMBERS } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import type { SplitType } from "@/types";

// TODO: make this interactive — selecting a type recomputes splits via lib/splitting.ts.
export function SplitEditor({
  amountCents,
  splitType = "equal",
}: {
  amountCents: number;
  splitType?: SplitType;
}) {
  const share = Math.floor(amountCents / MEMBERS.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(SPLIT_TYPES) as SplitType[]).map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={type === splitType}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-medium transition",
              type === splitType
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:bg-bg",
            )}
          >
            {SPLIT_TYPES[type].label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted">{SPLIT_TYPES[splitType].description}</p>

      <ul className="divide-y divide-border rounded-lg border border-border">
        {MEMBERS.map((member, index) => (
          <li key={member.id} className="flex items-center gap-3 px-3 py-2.5">
            <Avatar name={member.name} size="sm" />
            <span className="flex-1 text-sm">
              {member.isCurrentUser ? "You" : member.name}
            </span>
            <Input
              readOnly
              value={formatCurrency(
                // First member absorbs the remainder so the splits sum exactly.
                index === 0 ? amountCents - share * (MEMBERS.length - 1) : share,
              )}
              className="tnum h-8 w-28 text-right"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
