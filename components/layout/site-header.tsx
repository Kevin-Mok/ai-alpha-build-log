"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { primaryNav } from "@/lib/site";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-[2px] bg-accent shadow-[0_0_0_6px_rgba(130,199,188,0.12)]" />
              <div className="min-w-0">
                <p className="eyebrow">AI Blog</p>
                <p className="mt-1 max-w-xl text-[13px] leading-6 text-ink">
                  writing systems / product engineering / technical field notes
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <span className="status-chip hidden lg:inline-flex">workspace_ready</span>
              <Link href="/admin/login" className={buttonClassName("secondary")}>
                Admin
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          <div className="surface-panel-muted flex items-center justify-between gap-3 overflow-x-auto px-3 py-2">
            <nav className="flex min-w-max items-center gap-2">
              {primaryNav.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[6px] border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors",
                      isActive
                        ? "border-accent/40 bg-accentSoft text-accent"
                        : "border-transparent text-muted hover:border-line hover:bg-surfaceStrong hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <p className="hidden shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted lg:block">
              public_routes
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
