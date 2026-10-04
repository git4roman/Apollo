"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateIssue, useUpdateIssue } from "@/hooks/useIssueMutations";
import {
  emptyFormValues,
  toIssueInput,
  valuesFromIssue,
  type IssueFormValues,
} from "@/lib/issue-form";
import type { Issue } from "@/lib/issue-meta";
import { useState } from "react";
import { toast } from "sonner";
import { IssueForm } from "./IssueForm";

interface IssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Pass an issue to edit it; leave it out to create a new one.
  issue?: Issue;
}

export function IssueDialog({ open, onOpenChange, issue }: IssueDialogProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [createIssue, creation] = useCreateIssue();
  const [updateIssue, update] = useUpdateIssue();
  const isEditing = issue !== undefined;

  function handleOpenChange(next: boolean) {
    if (!next) setServerError(null);
    onOpenChange(next);
  }

  async function handleSubmit(values: IssueFormValues) {
    setServerError(null);
    const input = toIssueInput(values);
    try {
      if (issue) {
        await updateIssue({ variables: { id: issue.id, input } });
      } else {
        await createIssue({ variables: { input } });
      }
      toast.success(isEditing ? "Issue updated" : "Issue created");
      handleOpenChange(false);
    } catch (error) {
      // Keep the dialog open so the person can fix the problem and retry.
      setServerError(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit issue" : "New issue"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Change the details and save."
              : "Describe the work to be done."}
          </DialogDescription>
        </DialogHeader>
        <IssueForm
          initialValues={issue ? valuesFromIssue(issue) : emptyFormValues()}
          submitLabel={isEditing ? "Save changes" : "Create issue"}
          submitting={creation.loading || update.loading}
          serverError={serverError}
          onSubmit={handleSubmit}
          onCancel={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
