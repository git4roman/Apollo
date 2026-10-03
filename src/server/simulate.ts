import { GraphQLError } from "graphql";

const MIN_LATENCY_MS = 300;
const MAX_LATENCY_MS = 600;

export function simulateLatency(): Promise<void> {
  const ms = MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function assertNoForcedFailure(title: string): void {
  if (title.toLowerCase().includes("fail")) {
    throw new GraphQLError("Simulated server failure", {
      extensions: { code: "SIMULATED_FAILURE" },
    });
  }
}
