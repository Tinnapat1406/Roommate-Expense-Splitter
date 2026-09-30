// TODO: Balance computation and debt simplification (minimize number of transfers).
import type { 
    Balance,
    Expense,
    PersonalImpact,
    Settlement,
    Transfer,
 } from "@/types";

 export function personalImpact(
    expense : Expense,
    memberId : string
 ): PersonalImpact {
    const share = expense.splits.find((s) => s.memberId === memberId)?.amountCents ?? 0;

    return expense.paidBy === memberId
    ? { kind: "lent", amountCents: expense.amountCents - share }
    : { kind: "owe", amountCents: share };
 }

 export function computeBalances(
  memberIds: string[],
  expenses: Expense[],
  settlements: Settlement[] = [],
): Balance[] {
  const net = new Map<string, number>(memberIds.map((id) => [id, 0]));
  const add = (id: string, cents: number) =>
    net.set(id, (net.get(id) ?? 0) + cents);

  for (const expense of expenses) {
    add(expense.paidBy, expense.amountCents);
    for (const split of expense.splits) {
      add(split.memberId, -split.amountCents);
    }
  }

  for (const settlement of settlements) {
    if (settlement.status !== "completed") continue;
    add(settlement.fromMemberId, settlement.amountCents);
    add(settlement.toMemberId, -settlement.amountCents);
  }

  return [...net].map(([memberId, netCents]) => ({ memberId, netCents }));
}

export function simplifyDebts(balances: Balance[]): Transfer[] {
  const creditors = balances
    .filter((b) => b.netCents > 0)
    .map((b) => ({ ...b }))
    .sort((a, b) => b.netCents - a.netCents);

  const debtors = balances
    .filter((b) => b.netCents < 0)
    .map((b) => ({ ...b }))
    .sort((a, b) => a.netCents - b.netCents);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const amountCents = Math.min(-debtors[i].netCents, creditors[j].netCents);

    if (amountCents > 0) {
      transfers.push({
        fromMemberId: debtors[i].memberId,
        toMemberId: creditors[j].memberId,
        amountCents,
      });
    }

    debtors[i].netCents += amountCents;
    creditors[j].netCents -= amountCents;

    if (debtors[i].netCents === 0) i++;
    if (creditors[j].netCents === 0) j++;
  }

  return transfers;
}

export function balanceReconcile(balances : Balance[]): boolean {
      return balances.reduce((sum, b) => sum + b.netCents, 0) === 0;
}