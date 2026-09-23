// Sample data so the dashboard renders before Supabase is wired up.
// Delete this file once real queries land in lib/supabase.

import type { Balance, Expense, Member, RecurringRule } from "@/types";

export const MEMBERS: Member[] = [
  { id: "m1", name: "Alex Rivera", email: "alex@example.com", isCurrentUser: true },
  { id: "m2", name: "Sam Chen", email: "sam@example.com" },
  { id: "m3", name: "Jordan Blake", email: "jordan@example.com" },
  { id: "m4", name: "Priya Patel", email: "priya@example.com" },
];

export const CURRENT_USER = MEMBERS[0];

export function memberById(id: string): Member {
  return MEMBERS.find((m) => m.id === id) ?? MEMBERS[0];
}

function equalSplit(amountCents: number) {
  const share = Math.floor(amountCents / MEMBERS.length);
  const remainder = amountCents - share * MEMBERS.length;
  // First member absorbs the leftover cent so splits sum exactly.
  return MEMBERS.map((m, i) => ({
    memberId: m.id,
    amountCents: i === 0 ? share + remainder : share,
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
    recurringRule: "r1",
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
    recurringRule: "r2",
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
    id: "r3",
    description: "Cleaning service",
    amountCents: 12000,
    category: "household",
    interval: "biweekly",
    nextDueDate: "2026-09-24",
    paidBy: "m4",
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

/** Six months of household totals for the chart. Newest last. */
export const MONTHLY_TOTALS: { month: string; amountCents: number }[] = [
  { month: "Apr", amountCents: 298400 },
  { month: "May", amountCents: 341250 },
  { month: "Jun", amountCents: 312900 },
  { month: "Jul", amountCents: 355600 },
  { month: "Aug", amountCents: 289750 },
  { month: "Sep", amountCents: 330010 },
];

/** Positive = the household owes them. Always sums to zero. */
export const BALANCES: Balance[] = [
  { memberId: "m1", netCents: 64350 },
  { memberId: "m2", netCents: -12100 },
  { memberId: "m3", netCents: -21250 },
  { memberId: "m4", netCents: -31000 },
];
