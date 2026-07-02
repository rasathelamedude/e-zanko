import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  title: string;
  onClick: () => void;
}

function ErrorState({ title, onClick }: ErrorProps) {
  return (
    <div className="bg-background px-8 py-8">
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-base font-medium text-foreground">{title}</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Something went wrong on our end. Check your connection and try again.
        </p>
        <button
          onClick={onClick}
          className="mt-1 rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
