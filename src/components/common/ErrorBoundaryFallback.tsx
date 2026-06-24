import type { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

/**
 *
 * This Fallback is the UI that will be rendered when an error is thrown.
 * It will be used inside the GlobalErrorBoundary component.
 */

const ErrorBoundaryFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate();

  // When user clicks return to dashboard
  const handleReset = () => {
    // 1. Clear failed React Query caches
    resetErrorBoundary();
    // 2. Safely redirect the user to a secure root path using client-side routing
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <IoWarningOutline className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          {error?.message || "An unexpected system error occurred."}
        </p>
        <button
          onClick={handleReset}
          className="bg-[#14746f] hover:bg-[#0f766e] text-white font-medium py-2 px-6 rounded-md transition-colors w-full"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
