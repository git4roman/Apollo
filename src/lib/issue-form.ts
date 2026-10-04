import type { CreateIssueInput, Priority, Status } from "@/gql/graphql";
import type { Issue } from "./issue-meta";

export const TITLE_MAX_LENGTH = 100;

// What the form fields hold. Everything is a plain string so inputs stay
// controlled; we convert to the API shape only when submitting.
export interface IssueFormValues {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
}

export interface IssueFormErrors {
  title?: string;
}

export function emptyFormValues(): IssueFormValues {
  return {
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assignee: "",
  };
}

export function valuesFromIssue(issue: Issue): IssueFormValues {
  return {
    title: issue.title,
    description: issue.description ?? "",
    status: issue.status,
    priority: issue.priority,
    assignee: issue.assignee ?? "",
  };
}

// Pure function: easy to test without rendering anything.
export function validateIssueForm(values: IssueFormValues): IssueFormErrors {
  const title = values.title.trim();
  if (title.length === 0) return { title: "Title is required" };
  if (title.length > TITLE_MAX_LENGTH) {
    return {
      title: `Title must be ${TITLE_MAX_LENGTH} characters or fewer`,
    };
  }
  return {};
}

// Empty optional fields become `null`, which clears them on the server.
export function toIssueInput(values: IssueFormValues): CreateIssueInput {
  return {
    title: values.title.trim(),
    description: values.description.trim() || null,
    status: values.status,
    priority: values.priority,
    assignee: values.assignee.trim() || null,
  };
}
