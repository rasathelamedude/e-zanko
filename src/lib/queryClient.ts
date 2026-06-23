import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // throw error to the boundary when fetching fails
      retry: 1,
      refetchOnWindowFocus: false, // swtiching tabs will not refetch
    },
    mutations: {
      throwOnError: false, // prevent throwing error when form fields are invalid
    },
  },
});
