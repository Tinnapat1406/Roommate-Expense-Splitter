// A small stroked icon set, so the template carries no icon dependency.

import { cn } from "@/lib/utils";

const PATHS = {
  home: ["M3 10.75 12 3.5l9 7.25", "M5.25 9.5V20.5h4.25V15h5v5.5h4.25V9.5"],
  receipt: [
    "M6 3.5h12v17l-2-1.25-2 1.25-2-1.25-2 1.25-2-1.25z",
    "M9 8.5h6",
    "M9 12.5h6",
  ],
  repeat: [
    "M4 10.5A5.5 5.5 0 0 1 9.5 5H18",
    "m15 2 3 3-3 3",
    "M20 13.5A5.5 5.5 0 0 1 14.5 19H6",
    "m9 22-3-3 3-3",
  ],
  scale: [
    "M12 4v15.5",
    "M8 19.5h8",
    "M4.5 7.5h15",
    "M4.5 7.5 2 13.5h5z",
    "M19.5 7.5 17 13.5h5z",
  ],
  settings: [
    "M4 8h7",
    "M15 8h5",
    "M13 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
    "M4 16h5",
    "M13 16h7",
    "M11 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
  ],
  bolt: ["M13 2.5 4.5 13.5H11l-1 8 9.5-11.5H13z"],
  cart: [
    "M3 4.5h2l2.2 10.4a2 2 0 0 0 2 1.6h7a2 2 0 0 0 2-1.55L20 8.5H6",
    "M9.5 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
    "M17 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  ],
  wifi: [
    "M2.5 9a14 14 0 0 1 19 0",
    "M6 12.5a9 9 0 0 1 12 0",
    "M9.5 16a4 4 0 0 1 5 0",
    "M12 19.5h.01",
  ],
  box: ["M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z", "M3.5 7.5 12 12l8.5-4.5", "M12 12v9"],
  dots: ["M6 12h.01", "M12 12h.01", "M18 12h.01"],
  plus: ["M12 5v14", "M5 12h14"],
  arrowRight: ["M4 12h15", "m13 6 6 6-6 6"],
  check: ["m5 12.5 5 5 9-10.5"],
  users: [
    "M8.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7",
    "M2.5 20.5c0-3.3 2.7-6 6-6s6 2.7 6 6",
    "M16 5a3.5 3.5 0 0 1 0 7",
    "M17.5 15c2.8.4 4 2.6 4 5.5",
  ],
  mail: ["M3.5 6h17v12h-17z", "m3.5 7 8.5 6 8.5-6"],
  calendar: ["M4 6.5h16v14H4z", "M4 10.5h16", "M8.5 3.5v4", "M15.5 3.5v4"],
  card: ["M3 6.5h18v11H3z", "M3 10.5h18", "M6.5 14.5h3"],
  trendUp: ["m4 16.5 6-6 3.5 3.5L20 7.5", "M15 7.5h5v5"],
  trendDown: ["m4 7.5 6 6 3.5-3.5L20 16.5", "M15 16.5h5v-5"],
  logout: ["m15 16.5 4.5-4.5L15 7.5", "M19.5 12H9", "M9 4.5H5.5v15H9"],
  chevronDown: ["m6 9.5 6 6 6-6"],
  x: ["m6 6 12 12", "M18 6 6 18"],
  sparkle: ["M12 3.5 13.9 9 19.5 11 13.9 13 12 18.5 10.1 13 4.5 11 10.1 9z"],
  lock: ["M6.5 10.5h11v10h-11z", "M9 10.5V7.5a3 3 0 0 1 6 0v3"],
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
