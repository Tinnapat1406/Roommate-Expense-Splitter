// TODO: Household members.
import { MemberAvatar } from "@/components/member/MemberAvatar";
import { Badge } from "@/components/ui/Badge";
import { MEMBERS } from "@/lib/mock-data";

export function MemberList() {
  return (
    <ul className="divide-y divide-border">
      {MEMBERS.map((member) => (
        <li key={member.id} className="flex items-center gap-3 px-5 py-3.5">
          <MemberAvatar member={member} />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium">{member.name}</p>
              {member.isCurrentUser && <Badge tone="accent">You</Badge>}
            </div>
            <p className="truncate text-xs text-muted">{member.email}</p>
          </div>

          {/* TODO: removing someone with a non-zero balance must be blocked. */}
          <button
            type="button"
            disabled={member.isCurrentUser}
            className="rounded-lg px-2 py-1 text-xs text-muted transition hover:bg-bg hover:text-fg disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

