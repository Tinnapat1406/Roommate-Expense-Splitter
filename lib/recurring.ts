// TODO: Recurrence rules — next due date, catch-up for missed periods.
import type { RecurrenceInterval, RecurringRule } from "@/types";

const DAY_MS = 86_400_000;

export function addInterval(date: Date, interval: RecurrenceInterval) {
    const next = new Date(date);

    switch (interval) {
        case "weekly":
      next.setDate(next.getDate() + 7);
      break;
    case "biweekly":
      next.setDate(next.getDate() + 14);
      break;
    case "monthly": {
      const day = next.getDate();
      next.setDate(1);
      next.setMonth(next.getMonth() + 1);
      const lastDay = new Date(
        next.getFullYear(),
        next.getMonth() + 1,
        0,
      ).getDate();
      next.setDate(Math.min(day, lastDay));
      break;
    }
    case "yearly":
      next.setFullYear(next.getFullYear() + 1);
      break;

    }
    return next;
}

export function daysAway(date: string | Date, from = new Date()): number {
    const due = new Date(date).setHours(0, 0, 0, 0);
    const today = new Date(from).setHours(0, 0, 0, 0);
    return Math.round((due - today) / DAY_MS);
}

export function occurrencesWithin(
  rule: RecurringRule,
  days: number,
  from = new Date(),
): Date[] {
  if (!rule.active) return [];

  const limit = new Date(from);
  limit.setDate(limit.getDate() + days);

  const dates: Date[] = [];
  let cursor = new Date(rule.nextDueDate);

  // Guard against a runaway loop if a rule's date is far in the past.
  while (cursor <= limit && dates.length < 60) {
    if (daysAway(cursor, from) >= 0) dates.push(new Date(cursor));
    cursor = addInterval(cursor, rule.interval);
  }

  return dates;
}

export interface ForecastEntry{
    rule: RecurringRule;
    date: Date;
}

export function forecast(
  rules: RecurringRule[],
  days: number,
  from = new Date(),
): ForecastEntry[] {
  return rules
    .flatMap((rule) =>
      occurrencesWithin(rule, days, from).map((date) => ({ rule, date })),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}