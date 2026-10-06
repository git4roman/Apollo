"use client";

import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import type { Status } from "@/gql/graphql";
import {
  CREATE_ISSUE_MUTATION,
  DELETE_ISSUE_MUTATION,
  UPDATE_ISSUE_MUTATION,
} from "@/graphql/issues";
import {
  addIssueToLists,
  reconcileIssueInLists,
  removeIssueFromLists,
} from "@/lib/cache-updates";
import { STATUS_LABEL, type Issue } from "@/lib/issue-meta";

// Create: the new issue is not in any cached list yet, so we add it ourselves.
export function useCreateIssue() {
  return useMutation(CREATE_ISSUE_MUTATION, {
    update(cache, { data }) {
      if (data) addIssueToLists(cache, data.createIssue);
    },
  });
}

// Edit: no `update` needed. The mutation returns the full Issue with its id,
// so Apollo finds `Issue:<id>` in the cache and overwrites it. Every screen
// showing that issue re-renders on its own.
export function useUpdateIssue() {
  return useMutation(UPDATE_ISSUE_MUTATION, {
    update(cache, { data }) {
      if (data) reconcileIssueInLists(cache, data.updateIssue);
    },
  });
}

// Move: same mutation, but we tell Apollo what the server will probably say
// (`optimisticResponse`) so the card jumps columns immediately. If the server
// fails, Apollo throws the guess away and the card jumps back by itself.
export function useMoveIssue() {
  const [updateIssue] = useUpdateIssue();

  return async function moveIssue(issue: Issue, status: Status) {
    if (issue.status === status) return;
    try {
      await updateIssue({
        variables: { id: issue.id, input: { status } },
        optimisticResponse: {
          updateIssue: {
            ...issue,
            status,
            updatedAt: new Date().toISOString(),
          },
        },
      });
      toast.success(`Moved to ${STATUS_LABEL[status]}`);
    } catch {
      toast.error(`Couldn't move "${issue.title}". It was put back.`);
    }
  };
}

// Delete: the server only returns the id, so we remove the object ourselves.
export function useDeleteIssue() {
  const [deleteIssue, state] = useMutation(DELETE_ISSUE_MUTATION);

  async function remove(issue: Issue): Promise<boolean> {
    try {
      await deleteIssue({
        variables: { id: issue.id },
        optimisticResponse: { deleteIssue: issue.id },
        update(cache) {
          removeIssueFromLists(cache, issue.id);
        },
      });
      toast.success("Issue deleted");
      return true;
    } catch {
      toast.error(`Couldn't delete "${issue.title}". It was put back.`);
      return false;
    }
  }

  return { remove, loading: state.loading };
}
