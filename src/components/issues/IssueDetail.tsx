import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import type { Issue } from "@/server/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function IssueDetail({ issue }: { issue: Issue }) {
  return (
    <>
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft /> Back to board
          </Link>
        </Button>
      </div>

      <article className="bg-card rounded-xl border p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusBadge status={issue.status} />
          <PriorityBadge priority={issue.priority} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{issue.title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Assigned to {issue.assignee ?? "Unassigned"}
        </p>

        {issue.description ? (
          <p className="mt-8 leading-7 whitespace-pre-wrap">
            {issue.description}
          </p>
        ) : (
          <p className="text-muted-foreground mt-8 italic">No description.</p>
        )}

        <dl className="text-muted-foreground mt-10 grid gap-4 border-t pt-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium">Created</dt>
            <dd>{dateFormatter.format(new Date(issue.createdAt))}</dd>
          </div>
          <div>
            <dt className="font-medium">Last updated</dt>
            <dd>{dateFormatter.format(new Date(issue.updatedAt))}</dd>
          </div>
          <div>
            <dt className="font-medium">Issue ID</dt>
            <dd>{issue.id}</dd>
          </div>
        </dl>
      </article>
    </>
  );
}
