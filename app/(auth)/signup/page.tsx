// TODO: Signup page — create account, then create or join a household.
import Link from "next/link";

import { Field, Input } from "@/components/ui/Field";

// TODO: create the account, then route to household creation or an invite.
export default function SignupPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted">
          Then invite your roommates — takes a minute.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <Field label="Name">
          <Input name="name" placeholder="Alex Rivera" required />
        </Field>

        <Field label="Email">
          <Input type="email" name="email" placeholder="you@example.com" required />
        </Field>

        <Field label="Password" hint="At least 8 characters">
          <Input type="password" name="password" minLength={8} required />
        </Field>

        <button
          type="submit"
          className="h-10 rounded-lg bg-accent text-sm font-medium text-accent-fg transition hover:opacity-90"
        >
          Create account
        </button>
      </form>

      <p className="text-center text-xs text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}

