"use client";

import type { ReactNode } from "react";
import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

// Called once per browser tab (and once per request on the server).
function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    // A relative URL is fine because our queries only run in the browser
    // (see `ssr: false` in Board.tsx). On the server a relative URL would fail.
    link: new HttpLink({ uri: "/api/graphql" }),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
