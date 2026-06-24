import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

/**
 *
 * This component will be used inside main.tsx component to wrap the entire app.
 * So that any uncaught errors throughout the app can be caught by this component.
 */

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
  onReset: () => void;
}

const GlobalErrorBoundary = ({
  children,
  onReset,
}: GlobalErrorBoundaryProps) => {
  return (
    // ErrorBoundary from react-error-boundary is what catches uncaught errors
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={onReset}
      onError={(error, info) => {
        console.error("[Captured Global Error]:", error, info.componentStack);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
