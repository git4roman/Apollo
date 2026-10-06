import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/PriorityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { getIssueById } from "@/server/data";

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: IssuePageProps): Promise<Metadata> {
  const { id } = await params;
  const issue = await getIssueById(id);

  return {
    title: issue ? `${issue.title} · Trackr` : "Issue not found · Trackr",
    description: issue
      ? `Details for issue ${issue.title}.`
      : "The requested issue could not be found.",
  };
}

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;
  const issue = await getIssueById(id);

  if (!issue) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft /> Back to board
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href="/api/export">
            <Download /> Export CSV
          </a>
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
            <dd>{new Date(issue.createdAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-medium">Last updated</dt>
            <dd>{new Date(issue.updatedAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-medium">Issue ID</dt>
            <dd>{issue.id}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
