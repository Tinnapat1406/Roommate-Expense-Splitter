// TODO: Invite by email or link.
"use client";

import { useRef } from "react";

import { Input } from "@/components/ui/Field";

export function InviteMemberDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition hover:opacity-90"
      >
        Invite roommate
      </button>

      <dialog
        ref={dialog}
        className="m-auto w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-fg backdrop:bg-black/40"
      >
        <h2 className="text-sm font-semibold">Invite a roommate</h2>
        <p className="mt-1 text-xs text-muted">
          They&apos;ll join this household and see every expense from today on.
        </p>

        {/* TODO: Server Action — create a pending membership and email them. */}
        <form method="dialog" className="mt-5 flex flex-col gap-4">
          <Input type="email" name="email" placeholder="roommate@example.com" />

          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2">
            <span className="flex-1 truncate font-mono text-xs text-muted">
              splitmate.app/join/4b-valencia
            </span>
            <button
              type="button"
              className="text-xs font-medium text-accent hover:underline"
            >
              Copy
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              value="cancel"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-bg"
            >
              Cancel
            </button>
            <button
              type="submit"
              value="send"
              className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition hover:opacity-90"
            >
              Send invite
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

