import { SplitEditor } from "@/components/expenses/split-editor";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { CATEGORIES } from "@/lib/constants";
import { MEMBERS } from "@/lib/mock-data";
import type { ExpenseCategory } from "@/types";

// TODO: wire to a Server Action that validates with lib/validations.ts and inserts via Supabase.
export function ExpenseForm() {
  return (
    <form className="flex flex-col gap-5">
      <Field label="Description">
        <Input placeholder="Costco run" name="description" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount">
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            name="amount"
            className="tnum"
          />
        </Field>

        <Field label="Date">
          <Input type="date" name="date" />
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
          <Select name="paidBy" defaultValue="m1">
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
        <SplitEditor amountCents={18740} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Add expense</Button>
      </div>
    </form>
  );
}
