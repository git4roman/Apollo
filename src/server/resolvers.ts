import { GraphQLError } from "graphql";
import { assertNoForcedFailure, simulateLatency } from "./simulate";
import {
  findIssue,
  findIssues,
  insertIssue,
  patchIssue,
  removeIssue,
} from "./store";
import type {
  CreateIssueInput,
  Issue,
  IssueFilters,
  UpdateIssueInput,
} from "./types";

function notFound(id: string): GraphQLError {
  return new GraphQLError(`Issue ${id} not found`, {
    extensions: { code: "NOT_FOUND" },
  });
}

function assertValidTitle(title: string): void {
  if (title.trim().length === 0) {
    throw new GraphQLError("Title is required", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
}

export const resolvers = {
  Query: {
    issues: async (_parent: unknown, args: IssueFilters): Promise<Issue[]> => {
      await simulateLatency();
      return findIssues(args);
    },

    issue: async (
      _parent: unknown,
      args: { id: string },
    ): Promise<Issue | null> => {
      await simulateLatency();
      return findIssue(args.id) ?? null;
    },
  },

  Mutation: {
    createIssue: async (
      _parent: unknown,
      args: { input: CreateIssueInput },
    ): Promise<Issue> => {
      await simulateLatency();
      assertValidTitle(args.input.title);
      assertNoForcedFailure(args.input.title);
      return insertIssue(args.input);
    },

    updateIssue: async (
      _parent: unknown,
      args: { id: string; input: UpdateIssueInput },
    ): Promise<Issue> => {
      await simulateLatency();
      const existing = findIssue(args.id);
      if (!existing) throw notFound(args.id);

      if (args.input.title != null) assertValidTitle(args.input.title);

      // Only a newly submitted title can trigger the demo failure hook. An
      // existing title containing "fail" must not make unrelated edits fail.
      if (args.input.title != null) {
        assertNoForcedFailure(args.input.title);
      }

      const updated = patchIssue(args.id, args.input);
      if (!updated) throw notFound(args.id);
      return updated;
    },

    deleteIssue: async (
      _parent: unknown,
      args: { id: string },
    ): Promise<string> => {
      await simulateLatency();
      if (!removeIssue(args.id)) throw notFound(args.id);
      return args.id;
    },
  },
};
