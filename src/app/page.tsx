import { Board } from "@/components/issues/Board";
import { NewIssueButton } from "@/components/issues/NewIssueButton";
import { FilterBar } from "@/components/issues/FilterBar";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trackr</h1>
          <p className="text-muted-foreground text-sm">
            Track issues across your project.
          </p>
        </div>
        <NewIssueButton />
      </header>
      <FilterBar />
      <Board />
    </main>
  );
}
