import { findIssues } from "@/server/store";

const columns = [
  "id",
  "title",
  "description",
  "status",
  "priority",
  "assignee",
  "createdAt",
  "updatedAt",
] as const;

function csvCell(value: string | null): string {
  const text = value ?? "";
  return `"${text.replaceAll('"', '""')}"`;
}

export function GET(): Response {
  const rows = findIssues({}).map((issue) =>
    columns.map((column) => csvCell(issue[column])).join(","),
  );
  const csv = [columns.join(","), ...rows].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="trackr-issues.csv"',
      "Cache-Control": "no-store",
    },
  });
}
