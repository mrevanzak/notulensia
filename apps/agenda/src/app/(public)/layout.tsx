import AuthProvider from "@/components/auth-provider";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import Logo from "~/svg/logo.svg";

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
    <div className="layout tw-flex tw-flex-col">
      <div className="tw-p-10">
        <Link href="/">
          <Logo className="tw-w-56" />
        </Link>
      </div>
          <AuthProvider route="public">{children}</AuthProvider>
      </div>
  );
}
