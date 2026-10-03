import type { ApolloCache, Reference } from "@apollo/client";
import type { IssueFieldsFragment } from "@/gql/graphql";

// Put a newly created issue at the top of the cached `issues` list.
//
// Apollo already stored the new Issue object itself (it came back in the
// mutation result), but it has no idea the list `issues` should now contain
// it. `cache.modify` lets us edit that one list directly, with no refetch.
export function addIssueToLists(
  cache: ApolloCache,
  issue: IssueFieldsFragment,
): void {
  cache.modify({
    fields: {
      issues(existing: readonly Reference[] = [], { toReference }) {
        const ref = toReference(issue);
        if (!ref) return existing;
        // Guard against adding the same issue twice.
        if (existing.some((item) => item.__ref === ref.__ref)) return existing;
        return [ref, ...existing];
      },
    },
  });
}

// Remove a deleted issue from every cached `issues` list.
//
// We filter the list itself instead of only evicting the object. Editing the
// list works for optimistic responses too, so the card disappears instantly
// and comes back by itself if the server says no.
export function removeIssueFromLists(cache: ApolloCache, id: string): void {
  cache.modify({
    fields: {
      issues(existing: readonly Reference[] = [], { readField }) {
        return existing.filter((ref) => readField("id", ref) !== id);
      },
    },
  });
}
