import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { IssueDetail } from "@/components/issues/IssueDetail";
import { Button } from "@/components/ui/button";
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
      <div className="mb-8 flex justify-end">
        <Button asChild variant="outline">
          <a href="/api/export">
            <Download /> Export CSV
          </a>
        </Button>
      </div>
      <IssueDetail issue={issue} />
    </main>
  );
}
