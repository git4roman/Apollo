import type { Issue } from "@/lib/issue-meta";

export function makeIssue(overrides: Partial<Issue> = {}): Issue {
  return {
    __typename: "Issue",
    id: "issue-1",
    title: "Fix checkout flow",
    description: "Make checkout retries reliable.",
    status: "TODO",
    priority: "MEDIUM",
    assignee: "Maya Chen",
    createdAt: "2026-01-15T09:00:00.000Z",
    updatedAt: "2026-01-15T09:00:00.000Z",
    ...overrides,
  };
}
