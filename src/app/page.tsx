import { Board } from "@/components/issues/Board";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Trackr</h1>
        <p className="text-sm text-muted-foreground">
          Track issues across your project.
        </p>
      </header>
      <Board />
    </main>
  );
}
