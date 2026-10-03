import { Button } from "@/components/ui/button";

interface BoardErrorProps {
  message: string;
  onRetry: () => void;
}

export function BoardError({ message, onRetry }: BoardErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4"
    >
      <div>
        <p className="font-medium">Couldn&apos;t load issues</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
