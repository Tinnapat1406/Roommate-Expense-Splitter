import { InviteForm } from "@/components/household/invite-form";
import { MemberList } from "@/components/household/member-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/field";
import { Icon } from "@/components/ui/icons";
import { SPLIT_TYPES } from "@/lib/constants";
import { HOUSEHOLD } from "@/lib/mock-data";
import type { SplitType } from "@/types";

export default function SettingsPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Household, roommates, and how new expenses get split.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Household</CardTitle>
            <CardDescription>Visible to everyone you invite</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field label="Name">
            <Input defaultValue={HOUSEHOLD.name} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Currency">
              <Select defaultValue={HOUSEHOLD.currency}>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="THB">THB — Thai Baht</option>
              </Select>
            </Field>

            <Field
              label="Default split"
              hint="Applied to new expenses unless changed"
            >
              <Select defaultValue="equal">
                {(Object.keys(SPLIT_TYPES) as SplitType[]).map((key) => (
                  <option key={key} value={key}>
                    {SPLIT_TYPES[key].label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="flex justify-end">
            <Button>Save changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Roommates</CardTitle>
            <CardDescription>
              {HOUSEHOLD.members.length} people in this household
            </CardDescription>
          </div>
        </CardHeader>
        <MemberList />
        <CardContent className="border-t border-border">
          <InviteForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Payments</CardTitle>
            <CardDescription>Used when you settle up</CardDescription>
          </div>
          <Badge tone="neutral">
            <Icon name="lock" className="size-3" />
            Stripe
          </Badge>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-bg text-muted">
            <Icon name="card" className="size-4.5" />
          </span>
          <div className="flex-1">
            <p className="text-sm">No payment method yet</p>
            <p className="text-xs text-muted">
              Add a card to settle balances in one tap
            </p>
          </div>
          <Button variant="secondary">Add card</Button>
        </CardContent>
      </Card>
    </div>
  );
}
