// TODO: Projected cost for the period ahead.
import { Card } from "@/components/ui/Card";
import { MEMBERS } from "@/lib/mock-data";
import { splitEqual } from "@/lib/splitting";
import { formatCurrency } from "@/lib/utils";
import type { ForecastEntry } from "@/lib/recurring";


export function ForecastCard(
  entries,
  days,
): { entries: ForecastEntry[];
  days: number;
}){
    const total = entries.reduce((sum, e) => sum + e.rule.amountCents, 0);

  const yourShare = entries.reduce((sum, e) => {
    const splits = splitEqual(
      e.rule.amountCents,
      MEMBERS.map((m) => m.id),
    );
    return sum + (splits[0]?.amountCents ?? 0);
  }, 0);

  return(
        <Card className="flex flex-wrap items-end justify-between gap-6 p-7">
      <div>
        <p className="text-sm text-muted">Next {days} days</p>
        <p className="tnum mt-1 font-semibold tracking-tight text-hero">
          {formatCurrency(total)}
        </p>
        <p className="mt-2 text-[13px] text-muted">
          across {entries.length}{" "}
          {entries.length === 1 ? "charge" : "charges"} · your share{" "}
          <span className="tnum font-medium text-fg">
            {formatCurrency(yourShare)}
          </span>
        </p>
      </div>
    </Card>
  )
}
