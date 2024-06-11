"use client";

import { AppRouter } from "@/server/api/root";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";

export const api = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      /*  onError(error) {
        if (
          error.message === "SESSAO_EXPIRADA" ||
          (error instanceof TRPCClientError &&
            error.data?.apiError?.message === "SESSAO_EXPIRADA")
        ) {
          window.location.href = "/logout#showToast";
        }
      }, */
    }),
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: "always",
        retry: 2,
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 3,
      },
    },
  });

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),

        httpLink({
          transformer: superjson,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
