import { cache } from "react";
import { findIssue } from "./store";
import { simulateLatency } from "./simulate";
import type { Issue } from "./types";

// Server-side data access for routes and metadata. React's cache() deduplicates
// calls with the same id during a single server render/request.
export const getIssueById = cache(async (id: string): Promise<Issue | null> => {
  await simulateLatency();
  return findIssue(id) ?? null;
});
