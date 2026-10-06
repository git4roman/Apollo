import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Issue not found</h1>
      <p className="text-muted-foreground mt-2">
        This issue may have been deleted or the link may be incorrect.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">
          <ArrowLeft /> Back to board
        </Link>
      </Button>
    </main>
  );
}
