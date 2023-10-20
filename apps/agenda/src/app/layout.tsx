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

export default function RootLayout({ children }): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PrimeReactProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
