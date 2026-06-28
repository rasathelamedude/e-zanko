import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
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
