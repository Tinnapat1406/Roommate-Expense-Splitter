// TODO: Shown when a list has nothing in it.
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return(
    <div className={cn(
        "flex flex-col items-center justify-center gap-2 px-5 py-12 text-center",
        className,
      )}>
         <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="max-w-xs text-xs text-muted">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}

    </div>
  );
}
