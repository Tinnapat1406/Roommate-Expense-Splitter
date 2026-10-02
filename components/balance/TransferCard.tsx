// TODO: A single suggested payment: who pays whom.
import { SettleButton } from "@/components/balance/SettleButton";
import { MemberAvatar } from "@/components/member/MemberAvatar";
import { CURRENT_USER, memberById } from "@/lib/mock-data";
import { displayName, formatCurrency } from "@/lib/utils";
import type { Transfer } from "@/types";

export function TransferCard({ transfer }: { transfer: Transfer }) {
  const from = memberById(transfer.fromMemberId);
  const to = memberById(transfer.toMemberId);

  // You can only pay your own debts; otherwise the action is a nudge.
  const youOwe = from.id === CURRENT_USER.id;

  return (
    <li className="flex items-center gap-3 px-5 py-3.5">
      <MemberAvatar member={from} size="sm" />
      <span className="text-muted">→</span>
      <MemberAvatar member={to} size="sm" />

      <p className="min-w-0 flex-1 truncate text-sm">
        {displayName(from)} {youOwe ? "owe" : "owes"}{" "}
        {to.isCurrentUser ? "you" : displayName(to)}
      </p>

      <span className="tnum text-sm font-semibold">
        {formatCurrency(transfer.amountCents)}
      </span>

      <SettleButton variant={youOwe ? "primary" : "secondary"}>
        {youOwe ? "Pay" : "Remind"}
      </SettleButton>
    </li>
  );
}
