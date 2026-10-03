import { Badge } from "@/components/ui/badge";
import type { Status } from "@/gql/graphql";
import { STATUS_LABEL } from "@/lib/issue-meta";
import { cn } from "@/lib/utils";

const STYLES: Record<Status, string> = {
  TODO: "border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
  IN_PROGRESS:
    "border-blue-300 bg-blue-100 text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100",
  DONE: "border-green-300 bg-green-100 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-100",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={cn(STYLES[status])}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}
