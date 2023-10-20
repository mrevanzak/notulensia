import type { Metadata } from "next";
import type { ReactElement } from "react";
import React from "react";
import Logo from "~/svg/logo.svg";

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
    <div className="layout tw-flex tw-flex-col">
      <div className="tw-p-10">
        <Logo className="tw-w-56" />
      </div>
      {children}
    </div>
  );
}
