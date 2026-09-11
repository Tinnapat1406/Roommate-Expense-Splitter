// Categories, split types, currency defaults, navigation.

import type {
  ExpenseCategory,
  RecurrenceInterval,
  SplitType,
} from "@/types";
import type { IconName } from "@/components/ui/icons";

export const DEFAULT_CURRENCY = "USD";

export const NAV_ITEMS: ReadonlyArray<{
  href: string;
  label: string;
  icon: IconName;
}> = [
  { href: "/dashboard", label: "Overview", icon: "home" },
  { href: "/dashboard/expenses", label: "Expenses", icon: "receipt" },
  { href: "/dashboard/recurring", label: "Recurring", icon: "repeat" },
  { href: "/dashboard/balances", label: "Balances", icon: "scale" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export const CATEGORIES: Record<
  ExpenseCategory,
  { label: string; icon: IconName }
> = {
  rent: { label: "Rent", icon: "home" },
  utilities: { label: "Utilities", icon: "bolt" },
  internet: { label: "Internet", icon: "wifi" },
  groceries: { label: "Groceries", icon: "cart" },
  household: { label: "Household", icon: "box" },
  other: { label: "Other", icon: "dots" },
};

export const SPLIT_TYPES: Record<
  SplitType,
  { label: string; description: string }
> = {
  equal: { label: "Equally", description: "Same amount for everyone" },
  percentage: { label: "By percentage", description: "Must add up to 100%" },
  exact: { label: "Exact amounts", description: "Must add up to the total" },
  shares: { label: "By shares", description: "e.g. 2 shares for the big room" },
};

export const RECURRENCE_INTERVALS: Record<RecurrenceInterval, string> = {
  weekly: "Every week",
  biweekly: "Every 2 weeks",
  monthly: "Every month",
  yearly: "Every year",
};
