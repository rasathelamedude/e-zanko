import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  title: string;
  onClick: () => void;
}

function ErrorState({ title, onClick }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#F7F6F2] px-8 py-8">
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <p className="text-base font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Something went wrong on our end. Check your connection and try again.
        </p>
        <button
          onClick={onClick}
          className="mt-1 px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
