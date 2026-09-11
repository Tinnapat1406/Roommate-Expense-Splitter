// Static sample data so the template renders before Supabase is wired up.
// Delete this file once real queries land in lib/supabase.

import type {
  Balance,
  Expense,
  Household,
  Member,
  RecurringRule,
  Settlement,
  Transfer,
} from "@/types";

export const MEMBERS: Member[] = [
  { id: "m1", name: "Alex Rivera", email: "alex@example.com", isCurrentUser: true },
  { id: "m2", name: "Sam Chen", email: "sam@example.com" },
  { id: "m3", name: "Jordan Blake", email: "jordan@example.com" },
  { id: "m4", name: "Priya Patel", email: "priya@example.com" },
];

export const HOUSEHOLD: Household = {
  id: "h1",
  name: "Apt 4B — Valencia St",
  currency: "USD",
  members: MEMBERS,
};

export const CURRENT_USER = MEMBERS[0];

export function memberById(id: string): Member {
  return MEMBERS.find((member) => member.id === id) ?? MEMBERS[0];
}

/** "you" reads better than the signed-in person's own name. */
export function displayName(id: string): string {
  const member = memberById(id);
  return member.isCurrentUser ? "You" : member.name.split(" ")[0];
}

function equalSplit(amountCents: number): Expense["splits"] {
  const share = Math.floor(amountCents / MEMBERS.length);
  // The first member absorbs the rounding remainder so splits sum exactly.
  const remainder = amountCents - share * MEMBERS.length;
  return MEMBERS.map((member, index) => ({
    memberId: member.id,
    amountCents: index === 0 ? share + remainder : share,
  }));
}

export const EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "September rent",
    amountCents: 280000,
    category: "rent",
    paidBy: "m1",
    date: "2026-09-01",
    splitType: "equal",
    splits: equalSplit(280000),
    recurringRuleId: "r1",
  },
  {
    id: "e2",
    description: "PG&E — August",
    amountCents: 14250,
    category: "utilities",
    paidBy: "m2",
    date: "2026-09-03",
    splitType: "equal",
    splits: equalSplit(14250),
  },
  {
    id: "e3",
    description: "Costco run",
    amountCents: 18740,
    category: "groceries",
    paidBy: "m3",
    date: "2026-09-05",
    splitType: "equal",
    splits: equalSplit(18740),
  },
  {
    id: "e4",
    description: "Internet — Sonic",
    amountCents: 8000,
    category: "internet",
    paidBy: "m1",
    date: "2026-09-05",
    splitType: "equal",
    splits: equalSplit(8000),
    recurringRuleId: "r2",
  },
  {
    id: "e5",
    description: "Paper towels + dish soap",
    amountCents: 3420,
    category: "household",
    paidBy: "m4",
    date: "2026-09-07",
    splitType: "equal",
    splits: equalSplit(3420),
  },
  {
    id: "e6",
    description: "Pizza night",
    amountCents: 5600,
    category: "other",
    paidBy: "m2",
    date: "2026-09-08",
    splitType: "equal",
    splits: equalSplit(5600),
  },
];

export const RECURRING_RULES: RecurringRule[] = [
  {
    id: "r1",
    description: "Rent",
    amountCents: 280000,
    category: "rent",
    interval: "monthly",
    nextDueDate: "2026-10-01",
    paidBy: "m1",
    splitType: "equal",
    active: true,
  },
  {
    id: "r2",
    description: "Internet — Sonic",
    amountCents: 8000,
    category: "internet",
    interval: "monthly",
    nextDueDate: "2026-10-05",
    paidBy: "m1",
    splitType: "equal",
    active: true,
  },
  {
    id: "r3",
    description: "Cleaning service",
    amountCents: 12000,
    category: "household",
    interval: "biweekly",
    nextDueDate: "2026-09-19",
    paidBy: "m4",
    splitType: "equal",
    active: true,
  },
  {
    id: "r4",
    description: "Renters insurance",
    amountCents: 4800,
    category: "other",
    interval: "monthly",
    nextDueDate: "2026-10-12",
    paidBy: "m2",
    splitType: "equal",
    active: false,
  },
];

/** Positive means the household owes them. Always sums to zero. */
export const BALANCES: Balance[] = [
  { memberId: "m1", netCents: 64350 },
  { memberId: "m2", netCents: -12100 },
  { memberId: "m3", netCents: -21250 },
  { memberId: "m4", netCents: -31000 },
];

export const SUGGESTED_TRANSFERS: Transfer[] = [
  { fromMemberId: "m4", toMemberId: "m1", amountCents: 31000 },
  { fromMemberId: "m3", toMemberId: "m1", amountCents: 21250 },
  { fromMemberId: "m2", toMemberId: "m1", amountCents: 12100 },
];

export const SETTLEMENTS: Settlement[] = [
  {
    id: "s1",
    fromMemberId: "m2",
    toMemberId: "m1",
    amountCents: 45000,
    date: "2026-08-28",
    status: "completed",
  },
  {
    id: "s2",
    fromMemberId: "m3",
    toMemberId: "m1",
    amountCents: 22000,
    date: "2026-08-27",
    status: "completed",
  },
  {
    id: "s3",
    fromMemberId: "m4",
    toMemberId: "m1",
    amountCents: 18000,
    date: "2026-09-08",
    status: "pending",
  },
];

export const MONTH_TOTAL_CENTS = EXPENSES.reduce(
  (total, expense) => total + expense.amountCents,
  0,
);

export const YOUR_SHARE_CENTS = EXPENSES.reduce(
  (total, expense) =>
    total +
    (expense.splits.find((split) => split.memberId === CURRENT_USER.id)
      ?.amountCents ?? 0),
  0,
);
