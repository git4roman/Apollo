import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/gql/graphql";
import { PRIORITY_LABEL } from "@/lib/issue-meta";
import { cn } from "@/lib/utils";

// The label text is always shown, so color is never the only signal.
const STYLES: Record<Priority, string> = {
  LOW: "border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
  MEDIUM:
    "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100",
  HIGH: "border-orange-300 bg-orange-100 text-orange-900 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-100",
  URGENT:
    "border-red-300 bg-red-100 text-red-900 dark:border-red-700 dark:bg-red-950 dark:text-red-100",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant="outline" className={cn(STYLES[priority])}>
      {PRIORITY_LABEL[priority]}
    </Badge>
  );
}
