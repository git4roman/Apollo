"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IssueDialog } from "./IssueDialog";

export function NewIssueButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>New issue</Button>
      <IssueDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
