




import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { notifyError } from "./notify";

/**
 * Type the `meta` bag so components get autocomplete + type-safety when they
 * opt a query/mutation out of (or into) the global error toast.
 */
declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: {
      /** Toast when this query errors. Queries are silent by default. */
      showErrorToast?: boolean;
    };
    mutationMeta: {
      /**
       * Skip the global error toast — set this when the component renders its
       * own inline error for the failure (login, OTP, password forms, …).
       */
      suppressErrorToast?: boolean;
    };
  }
}

export const queryClient = new QueryClient({
  // Queries render their own error UI (skeleton → ErrorState), so stay quiet
  // unless a query explicitly opts in via `meta.showErrorToast`.
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.showErrorToast) notifyError(error);
    },
  }),
  // Mutations toast by default so no action fails silently; forms with inline
  // error UI opt out via `meta.suppressErrorToast`.
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.suppressErrorToast) return;
      notifyError(error);
    },
  }),
  defaultOptions: {
    queries: {
      throwOnError: false, // prevent throwing error when query fails, keep it in cache
      retry: 1,
      refetchOnWindowFocus: false, // swtiching tabs will not refetch
    },
    mutations: {
      throwOnError: false, // prevent throwing error when form fields are invalid
    },
  },
});
