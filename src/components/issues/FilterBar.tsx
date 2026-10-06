"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority, Status } from "@/gql/graphql";
import {
  PRIORITY_LABEL,
  PRIORITY_ORDER,
  STATUS_LABEL,
  STATUS_ORDER,
} from "@/lib/issue-meta";
import { useFilterStore } from "@/stores/filter-store";

const ALL = "__all__";

export function FilterBar() {
  const { status, priority, search, setStatus, setPriority, setSearch, clear } =
    useFilterStore();
  const hasFilters = Boolean(status || priority || search);

  return (
    <div className="bg-muted/40 mb-4 flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center">
      <Input
        aria-label="Search issues"
        className="sm:max-w-xs"
        placeholder="Search issues..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Select
        value={status ?? ALL}
        onValueChange={(value) =>
          setStatus(value === ALL ? null : (value as Status))
        }
      >
        <SelectTrigger aria-label="Filter by status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All statuses</SelectItem>
          {STATUS_ORDER.map((value) => (
            <SelectItem key={value} value={value}>
              {STATUS_LABEL[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={priority ?? ALL}
        onValueChange={(value) =>
          setPriority(value === ALL ? null : (value as Priority))
        }
      >
        <SelectTrigger aria-label="Filter by priority">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All priorities</SelectItem>
          {PRIORITY_ORDER.map((value) => (
            <SelectItem key={value} value={value}>
              {PRIORITY_LABEL[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button type="button" variant="ghost" onClick={clear}>
          <RotateCcw /> Clear
        </Button>
      )}
    </div>
  );
}
