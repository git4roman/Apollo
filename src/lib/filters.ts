import type { Issue } from "./issue-meta";
import type { Priority, Status } from "@/gql/graphql";

export interface IssueFilters {
  status?: Status | null;
  priority?: Priority | null;
  search?: string | null;
}

export function matchesIssueFilters(
  issue: Issue,
  filters: IssueFilters,
): boolean {
  if (filters.status && issue.status !== filters.status) return false;
  if (filters.priority && issue.priority !== filters.priority) return false;
  if (filters.search) {
    const search = filters.search.toLowerCase();
    const haystack =
      `${issue.title} ${issue.description ?? ""} ${issue.assignee ?? ""}`.toLowerCase();
    if (!haystack.includes(search)) return false;
  }
  return true;
}
