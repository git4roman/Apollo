"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  validateIssueForm,
  type IssueFormErrors,
  type IssueFormValues,
} from "@/lib/issue-form";
import {
  PRIORITY_LABEL,
  PRIORITY_ORDER,
  STATUS_LABEL,
  STATUS_ORDER,
} from "@/lib/issue-meta";
import { useRef, useState, type FormEvent } from "react";
import { SelectField } from "./SelectField";
import { TitleField } from "./TitleField";

interface IssueFormProps {
  initialValues: IssueFormValues;
  submitLabel: string;
  submitting: boolean;
  serverError: string | null;
  onSubmit: (values: IssueFormValues) => void;
  onCancel: () => void;
}

export function IssueForm({
  initialValues,
  submitLabel,
  submitting,
  serverError,
  onSubmit,
  onCancel,
}: IssueFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<IssueFormErrors>({});
  const titleRef = useRef<HTMLInputElement>(null);

  function setField<K extends keyof IssueFormValues>(
    key: K,
    value: IssueFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateIssueForm(values);
    setErrors(found);
    if (found.title) {
      titleRef.current?.focus();
      return;
    }
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <TitleField
        value={values.title}
        error={errors.title}
        inputRef={titleRef}
        onChange={(value) => setField("title", value)}
      />

      <div className="grid gap-2">
        <Label htmlFor="issue-description">Description</Label>
        <Textarea
          id="issue-description"
          value={values.description}
          onChange={(event) => setField("description", event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          id="issue-status"
          label="Status"
          value={values.status}
          options={STATUS_ORDER}
          labels={STATUS_LABEL}
          onChange={(value) => setField("status", value)}
        />
        <SelectField
          id="issue-priority"
          label="Priority"
          value={values.priority}
          options={PRIORITY_ORDER}
          labels={PRIORITY_LABEL}
          onChange={(value) => setField("priority", value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="issue-assignee">Assignee</Label>
        <Input
          id="issue-assignee"
          value={values.assignee}
          onChange={(event) => setField("assignee", event.target.value)}
        />
      </div>

      {serverError && (
        <p role="alert" className="text-destructive text-sm">
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
