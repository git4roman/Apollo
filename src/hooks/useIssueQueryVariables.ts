"use client";

import type { IssuesQueryVariables } from "@/gql/graphql";
import { useDebouncedValue } from "./useDebouncedValue";
import { useFilterStore } from "@/stores/filter-store";

export function useIssueQueryVariables(): IssuesQueryVariables {
  const status = useFilterStore((state) => state.status);
  const priority = useFilterStore((state) => state.priority);
  const search = useFilterStore((state) => state.search);
  const debouncedSearch = useDebouncedValue(search.trim());

  return {
    status,
    priority,
    search: debouncedSearch || null,
  };
}
