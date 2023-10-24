"use client";
import { PrimeReactProvider } from "primereact/api";
import "@/styles/layout/layout.scss";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "@/styles/demo/Demos.scss";
import "@/styles/globals.css";
import "~/theme/theme-light/purple/theme.scss";
import type { ReactElement } from "react";
import { LayoutProvider } from "@/context/layout-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

export default function RootLayout({ children }): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PrimeReactProvider>
          <QueryClientProvider client={queryClient}>
            <LayoutProvider>{children}</LayoutProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
