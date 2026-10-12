// TODO: Login page — Supabase email/password + magic link.
import Link from "next/link";

import { Field, Input } from "@/components/ui/Field";

// TODO: Server Action → supabase.auth.signInWithPassword.
export default function LoginPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">
          Log in to see where the house stands.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <Field label="Email">
          <Input type="email" name="email" placeholder="you@example.com" required />
        </Field>

        <Field label="Password">
          <Input type="password" name="password" placeholder="••••••••" required />
        </Field>

        <button
          type="submit"
          className="h-10 rounded-lg bg-accent text-sm font-medium text-accent-fg transition hover:opacity-90"
        >
          Log in
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        className="h-10 rounded-lg border border-border text-sm font-medium transition hover:bg-bg"
      >
        Email me a magic link
      </button>

      <p className="text-center text-xs text-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-accent">
          Create an account
        </Link>
      </p>
    </div>
  );
}
