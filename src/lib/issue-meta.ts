import type { IssuesQuery, Priority, Status } from "@/gql/graphql";

// One issue, exactly as the Issues query returns it (generated type).
export type Issue = IssuesQuery["issues"][number];

// Column order on the board.
export const STATUS_ORDER: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

export const STATUS_LABEL: Record<Status, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};
export const PRIORITY_ORDER: Priority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];
export const PRIORITY_LABEL: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};
