// TODO: Spend over time or by category.
import { Card, CardHeader } from "@/components/ui/Card";
import { MONTHLY_TOTALS } from "@/lib/mock-data";
import { formatCompact, formatCurrency } from "@/lib/utils";

export function SpendingChart(){
  const data = MONTHLY_TOTALS;
  
  const peak = Math.max(...data.map((d) => d.amountCents));
  const scale = Math.ceil(peak/50_000) * 50_000;

  const average = Math.round(
    data.reduce((sum,d)=>sum + d.amountCents,0)/data.length,
  );

  const gridlines = [scale, scale/2,0];

  return (
    <Card>
      <CardHeader title = "Household spending"
      action = {
        <span className = "text-xs text-muted">
            6-month avg{" "}
            <span className="tnum font-medium text-fg">
              {formatCurrency(average)}
            </span>
          </span>
        }/>

         <div className="px-5 py-5">
        <div className="flex gap-3">
          <div className="tnum flex h-48 w-10 flex-col justify-between text-right text-[10px] text-muted">
            {gridlines.map((value) => (
              <span key={value}>{formatCompact(value)}</span>
            ))}
          </div>

          <div className="relative h-48 flex-1">
            {gridlines.map((value, i) => (
              <div
                key={value}
                className="absolute inset-x-0 border-t border-border"
                style={{ top: `${(i / (gridlines.length - 1)) * 100}%` }}
              />
            ))}

            {/* Turns six numbers into a judgement: above or below normal. */}
            <div
              className="absolute inset-x-0 border-t border-dashed border-accent/60"
              style={{ bottom: `${(average / scale) * 100}%` }}
            />

            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {data.map((d) => (
                <div
                  key={d.month}
                  className="group relative flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className="w-2/5 rounded-t bg-accent transition group-hover:opacity-75"
                    style={{ height: `${(d.amountCents / scale) * 100}%` }}
                  />
                  <div className="pointer-events-none absolute bottom-full mb-1 hidden rounded-md border border-border bg-surface px-2 py-1 text-xs whitespace-nowrap shadow-sm group-hover:block">
                    <span className="font-medium">{d.month}</span>{" "}
                    <span className="tnum">{formatCurrency(d.amountCents)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 flex gap-3">
          <div className="w-10" />
          <div className="flex flex-1 justify-between gap-2">
            {data.map((d) => (
              <span
                key={d.month}
                className="flex-1 text-center text-[10px] text-muted"
              >
                {d.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      
    </Card>
  )
}