import { ShieldAlert } from "lucide-react";

const VerificationDocumentNotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-[0_8px_28px_rgba(18,35,55,0.06)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <ShieldAlert className="h-7 w-7 text-red-500" strokeWidth={1.8} />
        </div>
        <h1 className="mb-2 text-lg font-[850] text-foreground">
          Document not found
        </h1>
        <p className="text-sm text-muted-foreground">
          This verification link is invalid or the document could not be
          located.
        </p>
      </div>
    </div>
  );
};

export default VerificationDocumentNotFound;
