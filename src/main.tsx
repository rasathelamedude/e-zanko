import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";

import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import GlobalErrorBoundary from "./components/common/GlobalErrorBoundary.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* QueryErrorResetBoundary helps reset react-query errors in the cache*/}
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <AuthProvider>
            <BrowserRouter>
              <GlobalErrorBoundary onReset={reset}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </GlobalErrorBoundary>
            </BrowserRouter>
          </AuthProvider>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
