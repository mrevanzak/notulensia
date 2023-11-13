import AuthProvider from "@/components/auth-provider";
import Layout from "@/components/layout";
import type { Metadata } from "next";
import type { ReactElement } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "PrimeReact Avalon",
  description:
    "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: "device-width" },
  openGraph: {
    type: "website",
    title: "PrimeReact AVALON-REACT",
    url: "https://avalon.primereact.org/",
    description:
      "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
    images: ["https://www.primefaces.org/static/social/avalon-react.png"],
    ttl: 604800,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function MainLayout({
  children,
}: MainLayoutProps): ReactElement {
  return (
    <Layout>
      <AuthProvider route="private"> {children}</AuthProvider>
    </Layout>
  );
}
