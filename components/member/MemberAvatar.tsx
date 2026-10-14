// TODO: Initials avatar with a stable per-person color
import Image from "next/image";

import { cn, initials } from "@/lib/utils";
import type { Member } from "@/types";

const COLORS = [
  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  "bg-rose-500/15 text-rose-700 dark:text-rose-300",
];

/** Same person, same colour, everywhere. */
function colorFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash + char.charCodeAt(0)) % COLORS.length;
  return COLORS[hash];
}

const SIZES = { sm: "size-6 text-[10px]", md: "size-8 text-xs" };

/** next/image needs intrinsic dimensions; keep these in step with SIZES. */
const PIXELS = { sm: 24, md: 32 };

export function MemberAvatar({
  member,
  size = "md",
  className,
}: {
  member: Member;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  if (member.avatarUrl) {
    return (
      <Image
        src={member.avatarUrl}
        alt={member.name}
        width={PIXELS[size]}
        height={PIXELS[size]}
        className={cn("rounded-full object-cover", SIZES[size], className)}
      />
    );
  }

  return (
    <span
      title={member.name}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold",
        SIZES[size],
        colorFor(member.id),
        className,
      )}
    >
      {initials(member.name)}
    </span>
  );
}
