// TODO: Inline loading indicator.
import { cn } from "@/lib/utils";

/**
 * Inline only — buttons mid-action, "Settling…". For lists, use skeleton rows
 * instead: a spinner where a list will be causes a layout jump.
 */
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 animate-spin", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-20"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

