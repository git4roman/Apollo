import type { Issue } from "@/server/types";

const columns = [
  "id",
  "title",
  "description",
  "status",
  "priority",
  "assignee",
  "createdAt",
  "updatedAt",
] as const satisfies readonly (keyof Issue)[];

function neutralizeFormula(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function csvCell(value: string | null): string {
  const safeValue = neutralizeFormula(value ?? "");
  const escaped = safeValue.replaceAll('"', '""');
  return /[",\r\n]/.test(safeValue) ? `"${escaped}"` : escaped;
}

export function issuesToCsv(issues: Issue[]): string {
  const header = columns.join(",");
  const rows = issues.map((issue) =>
    columns.map((column) => csvCell(issue[column])).join(","),
  );

  return [header, ...rows].join("\r\n");
}
