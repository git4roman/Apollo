import { create } from "zustand";
import type { Priority, Status } from "@/gql/graphql";

interface FilterState {
  status: Status | null;
  priority: Priority | null;
  search: string;
  setStatus: (status: Status | null) => void;
  setPriority: (priority: Priority | null) => void;
  setSearch: (search: string) => void;
  clear: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  status: null,
  priority: null,
  search: "",
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setSearch: (search) => set({ search }),
  clear: () => set({ status: null, priority: null, search: "" }),
}));
