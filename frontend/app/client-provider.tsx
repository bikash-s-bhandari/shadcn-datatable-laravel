"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //5 min it cache the data for 5 min, after 5 min it will remove the cache data
      refetchOnWindowFocus: false, //it doesnt refetch data for every window focus or component is mount
    },
  },
});
export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryClientProvider>
    </>
  );
}
