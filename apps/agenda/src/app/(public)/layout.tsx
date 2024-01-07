import AuthProvider from "@/components/auth-provider";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import { I18nextProvider } from "react-i18next";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Notulensia",
};

export default function LandingLayout({
  children,
}: LandingLayoutProps): ReactElement {
    return (
        <div className="layout tw-min-h-screen tw-flex tw-items-center tw-flex-col">
          <AuthProvider route="public">{children}</AuthProvider>
        </div>
  );
}
