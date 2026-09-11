import { cn, initials } from "@/lib/utils";

const COLORS = [
  "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  "bg-rose-500/15 text-rose-700 dark:text-rose-300",
];

/** Stable per-person color so the same roommate looks the same everywhere. */
function colorFor(seed: string) {
  let hash = 0;
  for (const char of seed) hash = (hash + char.charCodeAt(0)) % COLORS.length;
  return COLORS[hash];
}

const SIZES = {
  sm: "size-6 text-[10px]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
};

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      title={name}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold",
        SIZES[size],
        colorFor(name),
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarGroup({ names }: { names: string[] }) {
  return (
    <span className="flex -space-x-2">
      {names.map((name) => (
        <Avatar
          key={name}
          name={name}
          size="sm"
          className="ring-2 ring-surface"
        />
      ))}
    </span>
  );
}
