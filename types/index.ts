// App-level domain types. Amounts are always integer cents — never floats.

export type SplitType = "equal" | "percentage" | "exact" | "shares";

export type ExpenseCategory =
  | "rent"
  | "utilities"
  | "internet"
  | "groceries"
  | "household"
  | "other";

export type RecurrenceInterval = "weekly" | "biweekly" | "monthly" | "yearly";

export type SettlementStatus = "pending" | "completed" | "failed";

export interface Member {
  id: string;
  name: string;
  email: string;
  /** The signed-in user, used to phrase copy as "you". */
  isCurrentUser?: boolean;
}

export interface Household {
  id: string;
  name: string;
  currency: string;
  members: Member[];
}

export interface Split {
  memberId: string;
  amountCents: number;
}

export interface Expense {
  id: string;
  description: string;
  amountCents: number;
  category: ExpenseCategory;
  /** Member who fronted the money. */
  paidBy: string;
  date: string;
  splitType: SplitType;
  splits: Split[];
  /** Set when the expense was generated from a RecurringRule. */
  recurringRuleId?: string;
}

export interface RecurringRule {
  id: string;
  description: string;
  amountCents: number;
  category: ExpenseCategory;
  interval: RecurrenceInterval;
  nextDueDate: string;
  paidBy: string;
  splitType: SplitType;
  active: boolean;
}

export interface Settlement {
  id: string;
  fromMemberId: string;
  toMemberId: string;
  amountCents: number;
  date: string;
  status: SettlementStatus;
}

/** Net position of one member: positive means the household owes them. */
export interface Balance {
  memberId: string;
  netCents: number;
}

/** A single suggested payment produced by debt simplification. */
export interface Transfer {
  fromMemberId: string;
  toMemberId: string;
  amountCents: number;
}
