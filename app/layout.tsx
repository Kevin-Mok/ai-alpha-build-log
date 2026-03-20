import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono text-ink">
        <div className="pointer-events-none fixed inset-0 -z-30 bg-terminalGlow opacity-70" />
        <div className="pointer-events-none fixed inset-0 -z-20 bg-grid bg-[size:36px_36px] opacity-[0.08]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-scan bg-[size:100%_4px] opacity-[0.03]" />
        <div className="min-h-[100dvh]">
          <SiteHeader />
          <main className="relative">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
