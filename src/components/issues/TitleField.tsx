import type { Ref } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleFieldProps {
  value: string;
  error?: string;
  inputRef: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
}

// The title input plus its validation message. The message is linked to the
// input with aria-describedby, so screen readers read it together.
export function TitleField({
  value,
  error,
  inputRef,
  onChange,
}: TitleFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="issue-title">Title</Label>
      <Input
        id="issue-title"
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "issue-title-error" : undefined}
      />
      {error && (
        <p
          id="issue-title-error"
          role="alert"
          className="text-destructive text-sm"
        >
          {error}
        </p>
      )}
    </div>
  );
}
