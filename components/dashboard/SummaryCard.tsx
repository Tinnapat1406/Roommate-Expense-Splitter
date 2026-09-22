// TODO: One stat tile (spend, your share, owed).
import { cn } from "@/lib/utils";

export function SummaryCard ({
  label,
  value,
  context,
  className
} : {
  label : string,
  value : string,
  context : string,
  className : string
}){
  return (
    <div className={cn(
        "rounded-xl border border-border bg-surface p-5 shadow-sm",
        className,
      )}>
        <p className="text-xs text-muted">{label}</p>
      <p className="tnum mt-1.5 font-semibold tracking-tight text-stat">
        {value}
      </p>
      {context && <p className="mt-1 text-xs text-muted">{context}</p>}
    </div>
  )
}