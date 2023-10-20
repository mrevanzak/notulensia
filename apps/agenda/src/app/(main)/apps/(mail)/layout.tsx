"use client";
import AppMailLayout from "@/demo/components/apps/mail/app-mail-layout";
import type {ReactElement} from "react";

interface AppMailLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppMailLayoutProps): ReactElement {
  return <AppMailLayout>{children}</AppMailLayout>;
}
