import type { Issue } from "@/lib/issue-meta";
import { PriorityBadge } from "./PriorityBadge";

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <article className="bg-card text-card-foreground hover:border-foreground/30 rounded-lg border p-3 shadow-sm transition-colors">
      <h3 className="text-sm leading-snug font-medium">{issue.title}</h3>
      {issue.description && (
        <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
          {issue.description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <PriorityBadge priority={issue.priority} />
        <span className="text-muted-foreground truncate text-xs">
          {issue.assignee ?? "Unassigned"}
        </span>
      </div>
    </article>
  );
}
