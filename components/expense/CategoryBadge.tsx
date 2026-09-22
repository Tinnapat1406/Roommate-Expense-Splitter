// TODO: Category label with its icon.
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants";
import type { ExpenseCategory } from "@/types";

export function CategoryBadge({ category }: { category: ExpenseCategory }) {
  return <Badge>{CATEGORIES[category].label}</Badge>;
}

