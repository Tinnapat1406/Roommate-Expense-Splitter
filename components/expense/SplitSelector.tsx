// TODO: Equal / percentage / exact / shares.
"use client";

import { Input } from "@/components/ui/Field";
import { SPLIT_TYPES } from "@/lib/constants";
import {
  splitByPercentage,
  splitByShares,
  splitEqual,
  splitRemainder,
} from "@/lib/splitting";
import { cn, formatCurrency } from "@/lib/utils";
import type { Member, Split, SplitType } from "@/types";



export interface SplitState {
  type: SplitType;
  values: Record<string, number>;
}

export function initialSplitState(): SplitState {
  return { type: "equal", values: {} };
}

/** Exported so the form's submit guard uses the same numbers the user sees. */
export function computeSplit(
  amountCents: number,
  members: Member[],
  state: SplitState
): Split[] {
  const ids = members.map((m) => m.id);

  switch (state.type) {
    case "equal":
      return splitEqual(amountCents, ids);

    case "share": {
      const total = ids.reduce((sum, id) => sum + (state.values[id] ?? 0), 0);
      if (total <= 0) return ids.map((id) => ({ memberId: id, amountCents: 0 }));
      return splitByShares(
        amountCents,
        Object.fromEntries(ids.map((id) => [id, state.values[id] ?? 0])),
      );
    }

    case "percentage": {
      const total = ids.reduce((sum, id) => sum + (state.values[id] ?? 0), 0);
      // Only the valid case can go through splitByPercentage; it enforces 100.
      if (Math.abs(total - 100) > 0.001) {
        return ids.map((id) => ({
          memberId: id,
          amountCents: Math.round((amountCents * (state.values[id] ?? 0)) / 100),
        }));
      }
      return splitByPercentage(
        amountCents,
        Object.fromEntries(ids.map((id) => [id, state.values[id] ?? 0])),
      );
    }

    case "exact":
      return ids.map((id) => ({
        memberId: id,
        amountCents: state.values[id] ?? 0,
      }));
  } 
}

export function SplitSelector({
  amountCents,
  members,
  value,
  onChange,
}: {
  amountCents: number;
  members: Member[];
  value: SplitState;
  onChange: (value: SplitState) => void;
}) {
  const splits = computeSplit(amountCents, members, value);
  const remainder = splitRemainder(amountCents, splits);

  // Equal and shares always reconcile; only user-entered numbers can drift.
  const canDrift = value.type === "exact" || value.type === "percentage";
  const editable = value.type !== "equal";

  const setValue = (memberId: string, raw: string) => {
    const parsed = Number.parseFloat(raw);
    onChange({
      ...value,
      values: { ...value.values, [memberId]: Number.isFinite(parsed) ? parsed : 0 },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(SPLIT_TYPES) as SplitType[]).map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={type === value.type}
            onClick={() => onChange({ type, values: {} })}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-medium transition",
              type === value.type
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:bg-bg",
            )}
          >
            {SPLIT_TYPES[type].label}
          </button>
        ))}
      </div>


        <p className="text-xs text-muted">{SPLIT_TYPES[value.type].description}</p>

      <ul className="divide-y divide-border rounded-lg border border-border">
        {members.map((member) => {
          const split = splits.find((s) => s.memberId === member.id);

          return (
            <li key={member.id} className="flex items-center gap-3 px-3 py-2.5">
              <span className="flex-1 truncate text-sm">
                {member.isCurrentUser ? "You" : member.name}
              </span>

              {editable && (
                <Input
                  type="number"
                  step={value.type === "exact" ? "0.01" : "1"}
                  min="0"
                  value={value.values[member.id] ?? ""}
                  onChange={(e) => setValue(member.id, e.target.value)}
                  className="tnum h-8 w-20 text-right"
                />
              )}

              <span className="tnum w-24 text-right text-sm font-medium">
                {formatCurrency(split?.amountCents ?? 0)}
              </span>
            </li>
          );
        })}
      </ul>

      {canDrift && remainder !== 0 && (
        <p className="rounded-lg bg-negative-soft px-3 py-2 text-xs font-medium text-negative">
          {remainder > 0
            ? `${formatCurrency(remainder)} still unassigned`
            : `${formatCurrency(-remainder)} over the total`}
        </p>
      )}
    </div>
  );
}
