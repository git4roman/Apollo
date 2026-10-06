import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "./FilterBar";
import { useFilterStore } from "@/stores/filter-store";

beforeEach(() => {
  useFilterStore.setState({ status: null, priority: null, search: "" });
});

describe("FilterBar", () => {
  it("lets a user search and clear the active filter", async () => {
    const user = userEvent.setup();
    render(<FilterBar />);

    const search = screen.getByRole("textbox", { name: "Search issues" });
    await user.type(search, "checkout");

    expect(search).toHaveValue("checkout");
    expect(useFilterStore.getState().search).toBe("checkout");
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /clear/i }));

    expect(search).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: /clear/i }),
    ).not.toBeInTheDocument();
  });
});
