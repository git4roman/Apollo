import { useFilterStore } from "./filter-store";

const initialFilters = {
  status: null,
  priority: null,
  search: "",
};

beforeEach(() => {
  useFilterStore.setState(initialFilters);
});

describe("filter store", () => {
  it("starts with no active filters", () => {
    expect(useFilterStore.getState()).toMatchObject(initialFilters);
  });

  it("updates filters and clears them", () => {
    const store = useFilterStore.getState();

    store.setStatus("IN_PROGRESS");
    store.setPriority("HIGH");
    store.setSearch("checkout");

    expect(useFilterStore.getState()).toMatchObject({
      status: "IN_PROGRESS",
      priority: "HIGH",
      search: "checkout",
    });

    useFilterStore.getState().clear();
    expect(useFilterStore.getState()).toMatchObject(initialFilters);
  });

  it("does not leak state into the next test", () => {
    expect(useFilterStore.getState()).toMatchObject(initialFilters);
  });
});
