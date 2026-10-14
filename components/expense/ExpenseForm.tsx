// TODO: Create/edit an expense.
"use client";

import { useState } from "react";

import {
  SplitSelector,
  computeSplit,
  initialSplitState,
  type SplitState,
} from "@/components/expense/SplitSelector";
import { Field, Input, Select } from "@/components/ui/Field";
import { CATEGORIES } from "@/lib/constants";
import { CURRENT_USER, MEMBERS } from "@/lib/mock-data";
import { splitRemainder } from "@/lib/splitting";
import type { ExpenseCategory } from "@/types";

/** "12.34" → 1234. TODO: reject more than 2 decimal places in validations.ts. */
function toCents(input: string): number {
  const parsed = Number.parseFloat(input);
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
}

export function ExpenseForm() {
  const [amount, setAmount] = useState("");
  const [split, setSplit] = useState<SplitState>(initialSplitState());

  const amountCents = toCents(amount);

  // Same calculation the selector renders, so the button agrees with the banner.
  const remainder = splitRemainder(
    amountCents,
    computeSplit(amountCents, MEMBERS, split),
  );

  const blocked = amountCents <= 0 || remainder !== 0;

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Server Action — validate with lib/validations.ts, insert via Supabase.
      }}
    >
      <Field label="Description">
        <Input name="description" placeholder="Costco run" required />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount">
          <Input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tnum"
            required
          />
        </Field>

        <Field label="Date">
          <Input
            name="date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </Field>

        <Field label="Category">
          <Select name="category" defaultValue="groceries">
            {(Object.keys(CATEGORIES) as ExpenseCategory[]).map((key) => (
              <option key={key} value={key}>
                {CATEGORIES[key].label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Paid by">
          <Select name="paidBy" defaultValue={CURRENT_USER.id}>
            {MEMBERS.map((member) => (
              <option key={member.id} value={member.id}>
                {member.isCurrentUser ? "You" : member.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted">Split</span>
        <SplitSelector
          amountCents={amountCents}
          members={MEMBERS}
          value={split}
          onChange={setSplit}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={blocked}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition hover:opacity-90 disabled:opacity-40"
        >
          Add expense
        </button>
      </div>
    </form>
  );
}

