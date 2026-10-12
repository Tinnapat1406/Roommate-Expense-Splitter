// TODO: Settings — household members, invites, default split rules, payment method.
import { PageHeader } from "@/components/layout/PageHeader";
import { InviteMemberDialog } from "@/components/member/InviteMemberDialog";
import { MemberList } from "@/components/member/MemberList";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/Field";
import { SPLIT_TYPES } from "@/lib/constants";
import { HOUSEHOLD } from "@/lib/mock-data";
import type { SplitType } from "@/types";

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <PageHeader
        title="Settings"
        subtitle="Household, roommates, and how new expenses get split."
      />

      <Card>
        <CardHeader title="Household" />
        <CardBody className="flex flex-col gap-4">
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
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title={`Roommates · ${HOUSEHOLD.members.length}`}
          action={<InviteMemberDialog />}
        />
        <MemberList />
      </Card>

      <Card>
        <CardHeader title="Payments" />
        <CardBody className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm">No payment method yet</p>
            <p className="text-xs text-muted">
              Add a card to settle balances in one tap
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-bg"
          >
            Add card
          </button>
        </CardBody>
      </Card>
    </main>
  );
}
