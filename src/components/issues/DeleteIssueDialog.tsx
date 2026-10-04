"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteIssue } from "@/hooks/useIssueMutations";
import type { Issue } from "@/lib/issue-meta";

interface DeleteIssueDialogProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteIssueDialog({
  issue,
  open,
  onOpenChange,
}: DeleteIssueDialogProps) {
  const { remove } = useDeleteIssue();

  async function handleDelete() {
    // Close first: the card disappears optimistically, and a toast reports
    // the result (and puts the card back if the server refuses).
    onOpenChange(false);
    await remove(issue);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this issue?</DialogTitle>
          <DialogDescription>
            &quot;{issue.title}&quot; will be deleted. This can&apos;t be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
