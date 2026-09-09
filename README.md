# Roommate Expense Splitter

Split rent, utilities, groceries, and random Venmos automatically with recurring
payments and balance tracking.

**Stack:** Next.js (App Router) · Supabase · Stripe · Tailwind CSS

## Status

Scaffold only. Every file below is an empty placeholder with a `TODO` note —
nothing is implemented yet.

## Structure

```
app/
  (auth)/            login, signup
  dashboard/         overview, expenses, recurring, balances, settings
  api/
    webhooks/stripe/ Stripe webhook handler
    cron/recurring/  turns due recurring rules into real expenses
components/
  ui/                shared primitives
  layout/            sidebar, header
  expenses/          expense form, list, split editor
  balances/          balance summary, settle up
  household/         members, invites
lib/
  supabase/          browser + server clients, session middleware
  stripe/            client + server SDK
  splitting.ts       equal / percentage / exact / shares
  balances.ts        net balances + debt simplification
  recurring.ts       recurrence rules
hooks/               data hooks
types/               domain + generated DB types
supabase/            migrations, seed data
```

## Getting started

```bash
cp .env.example .env.local   # fill in Supabase + Stripe keys
npm install
npm run dev
```
