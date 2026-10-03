import { Skeleton } from "@/components/ui/skeleton";
import { STATUS_ORDER } from "@/lib/issue-meta";

const CARDS_PER_COLUMN = [0, 1, 2];

export function BoardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading issues"
      className="grid gap-4 md:grid-cols-3"
    >
      {STATUS_ORDER.map((status) => (
        <div key={status} className="rounded-xl bg-muted/50 p-3">
          <Skeleton className="mb-3 h-6 w-24" />
          <div className="flex flex-col gap-2">
            {CARDS_PER_COLUMN.map((index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
