import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum Status {
    TODO
    IN_PROGRESS
    DONE
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }

  type Issue {
    id: ID!
    title: String!
    description: String
    status: Status!
    priority: Priority!
    assignee: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateIssueInput {
    title: String!
    description: String
    status: Status
    priority: Priority
    assignee: String
  }

  input UpdateIssueInput {
    title: String
    description: String
    status: Status
    priority: Priority
    assignee: String
  }

  type Query {
    issues(status: Status, priority: Priority, search: String): [Issue!]!
    issue(id: ID!): Issue
  }

  type Mutation {
    createIssue(input: CreateIssueInput!): Issue!
    updateIssue(id: ID!, input: UpdateIssueInput!): Issue!
    deleteIssue(id: ID!): ID!
  }
`;
