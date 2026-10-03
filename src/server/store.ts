import { seedIssues } from "./seed";
import type {
  CreateIssueInput,
  Issue,
  IssueFilters,
  UpdateIssueInput,
} from "./types";

interface Store {
  issues: Issue[];
  nextId: number;
}

const globalForStore = globalThis as unknown as { trackrStore?: Store };

function getStore(): Store {
  if (!globalForStore.trackrStore) {
    globalForStore.trackrStore = {
      issues: seedIssues.map((issue) => ({ ...issue })),
      nextId: seedIssues.length + 1,
    };
  }
  return globalForStore.trackrStore;
}

export function findIssues(filters: IssueFilters): Issue[] {
  const { status, priority, search } = filters;
  const term = search?.trim().toLowerCase();

  return getStore().issues.filter((issue) => {
    if (status && issue.status !== status) return false;
    if (priority && issue.priority !== priority) return false;
    if (term) {
      const haystack =
        `${issue.title} ${issue.description ?? ""}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
}

export function findIssue(id: string): Issue | undefined {
  return getStore().issues.find((issue) => issue.id === id);
}

export function insertIssue(input: CreateIssueInput): Issue {
  const store = getStore();
  const now = new Date().toISOString();
  const issue: Issue = {
    id: String(store.nextId++),
    title: input.title.trim(),
    description: input.description ?? null,
    status: input.status ?? "TODO",
    priority: input.priority ?? "MEDIUM",
    assignee: input.assignee ?? null,
    createdAt: now,
    updatedAt: now,
  };
  store.issues.unshift(issue);
  return issue;
}

export function patchIssue(
  id: string,
  input: UpdateIssueInput,
): Issue | undefined {
  const issue = findIssue(id);
  if (!issue) return undefined;

  if (input.title != null) issue.title = input.title.trim();
  if (input.description !== undefined) issue.description = input.description;
  if (input.status != null) issue.status = input.status;
  if (input.priority != null) issue.priority = input.priority;
  if (input.assignee !== undefined) issue.assignee = input.assignee;
  issue.updatedAt = new Date().toISOString();
  return issue;
}

export function removeIssue(id: string): boolean {
  const store = getStore();
  const index = store.issues.findIndex((issue) => issue.id === id);
  if (index === -1) return false;
  store.issues.splice(index, 1);
  return true;
}
