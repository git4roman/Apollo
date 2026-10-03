import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // The schema lives in a TS file (gql tag); codegen extracts it from there.
  schema: "src/server/schema.ts",
  // Every gql()/graphql() call in client code is turned into a typed document.
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**", "!src/server/**"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        strictScalars: true,
        scalars: { ID: "string" },
      },
    },
  },
};

export default config;
