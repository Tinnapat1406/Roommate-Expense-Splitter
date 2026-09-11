import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

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
          <Input name="name" placeholder="Alex Rivera" />
        </Field>

        <Field label="Email">
          <Input type="email" name="email" placeholder="you@example.com" />
        </Field>

        <Field label="Password" hint="At least 8 characters">
          <Input type="password" name="password" placeholder="••••••••" />
        </Field>

        <Button type="submit" className="w-full">
          Create account
        </Button>
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
