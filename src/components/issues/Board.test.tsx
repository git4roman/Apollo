import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ISSUES_QUERY } from "@/graphql/issues";
import { makeIssue } from "@/test/fixtures";
import { renderWithApollo } from "@/test/render";
import { Board } from "./Board";

const variables = {
  status: null,
  priority: null,
  search: null,
};

describe("Board", () => {
  it("shows loading state and then renders the returned issue", async () => {
    const issue = makeIssue({ title: "Connect billing webhook" });

    renderWithApollo(<Board />, [
      {
        request: { query: ISSUES_QUERY, variables },
        result: { data: { issues: [issue] } },
      },
    ]);

    expect(
      screen.getByRole("status", { name: "Loading issues" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Connect billing webhook"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("status", { name: "Loading issues" }),
    ).not.toBeInTheDocument();
  });

  it("shows the error and retries with the next matching response", async () => {
    const issue = makeIssue({ title: "Recovered issue" });

    renderWithApollo(<Board />, [
      {
        request: { query: ISSUES_QUERY, variables },
        error: new Error("Network unavailable"),
      },
      {
        request: { query: ISSUES_QUERY, variables },
        result: { data: { issues: [issue] } },
      },
    ]);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Couldn't load issues");
    expect(screen.queryByText("Recovered issue")).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Recovered issue")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
