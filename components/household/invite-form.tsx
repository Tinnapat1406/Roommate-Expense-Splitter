import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { Icon } from "@/components/ui/icons";

// TODO: send an invite email and create a pending membership row.
export function InviteForm() {
  return (
    <div className="flex flex-col gap-3">
      <form className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          name="email"
          placeholder="roommate@example.com"
          className="flex-1"
        />
        <Button type="submit">
          <Icon name="mail" className="size-4" />
          Send invite
        </Button>
      </form>

      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5">
        <Icon name="sparkle" className="size-4 text-muted" />
        <span className="flex-1 truncate font-mono text-xs text-muted">
          splitmate.app/join/4b-valencia
        </span>
        <Button variant="ghost" size="sm">
          Copy link
        </Button>
      </div>
    </div>
  );
}
