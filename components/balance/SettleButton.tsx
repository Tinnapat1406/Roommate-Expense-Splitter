// TODO: Mark as paid, or charge via Stripe.
import { cn } from "@/lib/utils";

export function SettleButton({
  variant = "primary",
  children,
  className,
}: {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg px-3 py-1.5 text-xs font-medium transition",
        variant === "primary"
          ? "bg-accent text-accent-fg hover:opacity-90"
          : "border border-border text-fg hover:bg-bg",
        className,
      )}
    >
      {children}
    </button>
  );
}
