// Shared helpers — currency formatting, dates, class names.

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Amounts are stored as integer cents; format them for display. */
export function formatCurrency(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/** Drops the cents when they're zero — "$2,800" reads better than "$2,800.00". */
export function formatCurrencyShort(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatLongDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
