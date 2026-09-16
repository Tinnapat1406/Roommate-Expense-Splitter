// TODO: App-level domain types — Household, Member, Expense, Split, RecurringRule, Settlement.
export type SplitType = "equal" | "percentage" | "exact" | "share";
export type ExpenseCategory =
|"rent"
|"utilities"
|"groceries"
|"internet"
|"household"
|"other"

export type RecurrenceInterval = "weekly" | "biweekly" | "monthly" | "yearly";
export type SettlementStatus = "pending" | "completed" | "failed";

export interface Member{
    id:string;
    name:string;
    email:string;
    phone?:string;
    avatarUrl?:string;
    isCurrentUser?:boolean;
}

export interface Household{
    id:string;
    name:string;
    members:Member[];
    currency:string;
}

export interface Split{
    memberId:string;
    amountCents:number;
}

export interface Expense{
    id:string;
    description:string;
    amountCents:number;
    category:ExpenseCategory;
    paidBy:string;
    date:string;
    splitType:SplitType;
    splits:Split[];
    recurringRule?:string;
}

export interface RecurringRule{
    id:string;
    description:string;
    amountCents:number;
    category:ExpenseCategory;
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

/** One suggested payment produced by debt simplification. */
export interface Transfer {
  fromMemberId: string;
  toMemberId: string;
  amountCents: number;
}

/**
 * What an expense did to *you* — the second line RecentActivity needs.
 * "$187.40" alone is meaningless; "your share $46.85" is the point.
 */
export interface PersonalImpact {
  kind: "lent" | "owe";
  amountCents: number;
}

