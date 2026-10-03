export type Status = "TODO" | "IN_PROGRESS" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Issue {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IssueFilters {
  status?: Status | null;
  priority?: Priority | null;
  search?: string | null;
}

export interface CreateIssueInput {
  title: string;
  description?: string | null;
  status?: Status | null;
  priority?: Priority | null;
  assignee?: string | null;
}

export interface UpdateIssueInput {
  title?: string | null;
  description?: string | null;
  status?: Status | null;
  priority?: Priority | null;
  assignee?: string | null;
}
