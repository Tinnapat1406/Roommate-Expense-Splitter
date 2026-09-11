import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MEMBERS } from "@/lib/mock-data";

export function MemberList() {
  return (
    <ul className="divide-y divide-border">
      {MEMBERS.map((member) => (
        <li key={member.id} className="flex items-center gap-3 px-5 py-3.5">
          <Avatar name={member.name} />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium">{member.name}</p>
              {member.isCurrentUser && <Badge tone="accent">You</Badge>}
            </div>
            <p className="truncate text-xs text-muted">{member.email}</p>
          </div>

          <Button variant="ghost" size="sm" disabled={member.isCurrentUser}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
}
