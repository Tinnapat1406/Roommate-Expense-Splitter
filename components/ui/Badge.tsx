// TODO: Small status/label pill.
import { cn } from "@/lib/utils";

type Tone = "neutral" | "positive" | "negative" | "accent";

const TONES: Record<Tone, string> = {
  neutral: "bg-bg text-muted border-border",
  accent: "bg-accent-soft text-accent border-transparent",
  positive: "bg-positive-soft text-positive border-transparent",
  negative: "bg-negative-soft text-negative border-transparent",
}

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone }) {
    return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
