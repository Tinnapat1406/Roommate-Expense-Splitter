// TODO: Shared helpers — currency formatting, dates, cn().
export function cn(
    ...classes : Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

export function formatCurrency(
    cents: number,
    currency =  "USD"
): string{
    return new Intl.NumberFormat("en-US",{
        style: "currency",
        currency,
    }).format(cents / 100);
}

export function formatCurrencyShort(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}


export function formatCompact(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(cents / 100);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function dateChip(date: string): { month: string; day: string } {
  const parsed = new Date(date);
  return {
    month: parsed.toLocaleDateString("en-US", { month: "short" }),
    day: String(parsed.getDate()),
  };
}

export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function displayName(member: { name: string; isCurrentUser?: boolean }) {
  return member.isCurrentUser ? "You" : member.name.split(" ")[0];
}