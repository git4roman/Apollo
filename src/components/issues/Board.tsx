"use client";

import { ISSUES_QUERY } from "@/graphql/issues";
import { STATUS_ORDER } from "@/lib/issue-meta";
import { useQuery } from "@apollo/client/react";
import { BoardColumn } from "../BoardColumn";
import { BoardError } from "./BoardError";
import { BoardSkeleton } from "./BoardSkeleton";

export function Board() {
  // `ssr: false`: skip the server render and fetch in the browser, so the
  // server sends the loading skeleton and the browser fills in the data.
  const { data, loading, error, refetch } = useQuery(ISSUES_QUERY, {
    ssr: false,
  });

  if (data) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {STATUS_ORDER.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            issues={data.issues.filter((issue) => issue.status === status)}
          />
        ))}
      </div>
    );
  }

  if (error && !loading) {
    return (
      <BoardError message={error.message} onRetry={() => void refetch()} />
    );
  }

  return <BoardSkeleton />;
}
