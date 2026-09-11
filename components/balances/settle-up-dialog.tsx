import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/field";
import { Icon } from "@/components/ui/icons";
import { MEMBERS, memberById } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { Transfer } from "@/types";

// TODO: turn into a real dialog and charge through Stripe (lib/stripe/client.ts).
export function SettleUpDialog({ transfer }: { transfer: Transfer }) {
  const from = memberById(transfer.fromMemberId);
  const to = memberById(transfer.toMemberId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settle up</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center justify-center gap-4 rounded-lg bg-bg px-4 py-5">
          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={from.name} size="lg" />
            <span className="text-xs text-muted">
              {from.isCurrentUser ? "You" : from.name.split(" ")[0]}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="tnum text-lg font-semibold">
              {formatCurrency(transfer.amountCents)}
            </span>
            <Icon name="arrowRight" className="size-5 text-muted" />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <Avatar name={to.name} size="lg" />
            <span className="text-xs text-muted">
              {to.isCurrentUser ? "You" : to.name.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Paying">
            <Select defaultValue={to.id}>
              {MEMBERS.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.isCurrentUser ? "You" : member.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Amount">
            <Input
              type="number"
              step="0.01"
              defaultValue={(transfer.amountCents / 100).toFixed(2)}
              className="tnum"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary">
            <Icon name="check" className="size-4" />
            Mark as paid
          </Button>
          <Button>
            <Icon name="card" className="size-4" />
            Pay with card
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
