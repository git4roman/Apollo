import { graphql } from "@/gql";

// `graphql()` comes from the generated folder. After you run `npm run codegen`,
// TypeScript knows exactly what shape the result of this query has.
export const ISSUES_QUERY = graphql(`
  query Issues {
    issues {
      id
      title
      description
      status
      priority
      assignee
      createdAt
      updatedAt
    }
  }
`);
