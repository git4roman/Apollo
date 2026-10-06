"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold">Couldn&apos;t load this issue</h1>
      <p className="text-muted-foreground mt-2">
        Something went wrong while loading the issue.
      </p>
      <Button className="mt-6" onClick={retry}>
        Try again
      </Button>
    </main>
  );
}
