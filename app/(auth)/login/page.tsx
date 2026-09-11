import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Icon } from "@/components/ui/icons";

// TODO: submit to a Server Action calling supabase.auth.signInWithPassword.
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
          <Input type="email" name="email" placeholder="you@example.com" />
        </Field>

        <Field label="Password">
          <Input type="password" name="password" placeholder="••••••••" />
        </Field>

        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button variant="secondary" className="w-full">
        <Icon name="mail" className="size-4" />
        Email me a magic link
      </Button>

      <p className="text-center text-xs text-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-accent">
          Create an account
        </Link>
      </p>
    </div>
  );
}
