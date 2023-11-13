import AuthProvider from "@/components/auth-provider";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "PrimeReact Avalon",
  description:
    "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
};

export default function LandingLayout({
  children,
}: LandingLayoutProps): ReactElement {
  return <AuthProvider route="public">{children}</AuthProvider>;
}
