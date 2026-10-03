import { graphql } from "@/gql";

// A fragment is a reusable list of fields. Every query and mutation below
// spreads it, so they all return the exact same shape of Issue.
// `__typename` is asked for explicitly: Apollo uses it together with `id` to
// build cache keys like "Issue:3", and optimistic responses must include it.
export const ISSUE_FIELDS = graphql(`
  fragment IssueFields on Issue {
    __typename
    id
    title
    description
    status
    priority
    assignee
    createdAt
    updatedAt
  }
`);

export const ISSUES_QUERY = graphql(`
  query Issues {
    issues {
      ...IssueFields
    }
  }
`);

export const CREATE_ISSUE_MUTATION = graphql(`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      ...IssueFields
    }
  }
`);

export const UPDATE_ISSUE_MUTATION = graphql(`
  mutation UpdateIssue($id: ID!, $input: UpdateIssueInput!) {
    updateIssue(id: $id, input: $input) {
      ...IssueFields
    }
  }
`);

export const DELETE_ISSUE_MUTATION = graphql(`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(id: $id)
  }
`);
