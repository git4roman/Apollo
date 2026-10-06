import { findIssues } from "@/server/store";
import { issuesToCsv } from "@/lib/csv";

export function GET(): Response {
  const csv = issuesToCsv(findIssues({}));

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="trackr-issues.csv"',
      "Cache-Control": "no-store",
    },
  });
}
