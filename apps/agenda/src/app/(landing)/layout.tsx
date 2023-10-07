import type {Metadata} from "next";
import type {ReactElement} from "react";
import React from "react";
import AppConfig from "@/src/layout/app-config";

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
  return (
    <>
      <AppConfig minimal />
      {children}
    </>
  );
}
