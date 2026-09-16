// TODO: Categories, split types, currency defaults.
import type {
  ExpenseCategory,
  RecurrenceInterval,
  SplitType,
} from "@/types";

export const DEFAULT_CURRENCY = "USD";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/expenses", label: "Expenses" },
  { href: "/dashboard/recurring", label: "Recurring" },
  { href: "/dashboard/balances", label: "Balances" },
  { href: "/dashboard/settings", label: "Settings" },
] as const;

export const CATEGORIES: Record<ExpenseCategory, { label: string }> = {
  rent: { label: "Rent" },
  utilities: { label: "Utilities" },
  internet: { label: "Internet" },
  groceries: { label: "Groceries" },
  household: { label: "Household" },
  other: { label: "Other" },
};

export const SPLIT_TYPES: Record<
  SplitType,
  { label: string; description: string }
> = {
  equal: { label: "Equally", description: "Same amount for everyone" },
  percentage: { label: "By percentage", description: "Must add up to 100%" },
  exact: { label: "Exact amounts", description: "Must add up to the total" },
  share: { label: "By shares", description: "e.g. 2 shares for the big room" },
};

export const RECURRENCE_INTERVALS: Record<RecurrenceInterval, string> = {
  weekly: "Every week",
  biweekly: "Every 2 weeks",
  monthly: "Every month",
  yearly: "Every year",
};
