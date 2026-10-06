import type { Status } from "@/gql/graphql";
import { STATUS_LABEL, type Issue } from "@/lib/issue-meta";
import { IssueCard } from "./issues/IssueCard";
import { StatusBadge } from "./StatusBadge";

interface BoardColumnProps {
  status: Status;
  issues: Issue[];
}

export function BoardColumn({ status, issues }: BoardColumnProps) {
  const headingId = `column-${status}`;

  return (
    <section
      aria-labelledby={headingId}
      className="bg-muted/50 flex flex-col rounded-xl p-3"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 id={headingId}>
          <StatusBadge status={status} />
        </h2>
        <span className="text-muted-foreground text-xs">
          {issues.length} {issues.length === 1 ? "issue" : "issues"}
        </span>
      </div>

      {issues.length === 0 ? (
        <p className="text-muted-foreground rounded-lg border border-dashed p-4 text-center text-sm">
          No issues in {STATUS_LABEL[status]}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {issues.map((issue) => (
            <li key={issue.id}>
              <IssueCard issue={issue} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
