"use client";

import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMoveIssue } from "@/hooks/useIssueMutations";
import { STATUS_LABEL, STATUS_ORDER, type Issue } from "@/lib/issue-meta";
import { DeleteIssueDialog } from "./DeleteIssueDialog";
import { IssueDialog } from "./IssueDialog";

export function IssueActions({ issue }: { issue: Issue }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const moveIssue = useMoveIssue();

  return (
    <>
      {/* modal={false} lets the dialogs below take focus cleanly once the
          menu closes. */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${issue.title}`}
          >
            <Ellipsis aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Move to</DropdownMenuLabel>
          {STATUS_ORDER.filter((status) => status !== issue.status).map(
            (status) => (
              <DropdownMenuItem
                key={status}
                onSelect={() => void moveIssue(issue, status)}
              >
                {STATUS_LABEL[status]}
              </DropdownMenuItem>
            ),
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <IssueDialog open={editOpen} onOpenChange={setEditOpen} issue={issue} />
      <DeleteIssueDialog
        issue={issue}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
