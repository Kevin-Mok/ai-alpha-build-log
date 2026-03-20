import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-10">
        <div className="surface-panel-muted grid gap-6 px-4 py-4 lg:grid-cols-[1.25fr_0.85fr_0.55fr] lg:px-5">
          <div className="space-y-3">
            <p className="eyebrow">AI Blog</p>
            <p className="max-w-2xl text-[13px] leading-7 text-muted">
              {siteConfig.description} Built with repo-native MDX, Prisma, Supabase auth, and a
              dark CLI workspace system.
            </p>
          </div>
          <div className="grid gap-2 text-[12px] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:grid-cols-1">
            <Link href="/feed.xml" className="transition-colors hover:text-accent">
              RSS feed
            </Link>
            <Link href="/contact" className="transition-colors hover:text-accent">
              Contact
            </Link>
            <Link href="/about" className="transition-colors hover:text-accent">
              About
            </Link>
          </div>
          <div className="space-y-2 text-[11px] uppercase tracking-[0.18em] text-muted">
            <p>status: live</p>
            <p>theme: cli-dark</p>
            <p>content: mdx</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
