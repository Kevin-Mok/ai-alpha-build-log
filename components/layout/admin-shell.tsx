import Link from "next/link";
import { LogoutButton } from "@/components/forms/logout-button";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  viewer: string;
  active: "subscribers" | "inquiries";
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AdminShell({
  viewer,
  active,
  title,
  description,
  children
}: AdminShellProps) {
  return (
    <div className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-10">
      <header className="surface-panel px-5 py-5 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Admin session</p>
            <div>
              <h1 className="text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-ink">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-[13px] leading-7 text-muted">{description}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[12px] uppercase tracking-[0.18em] text-muted">{viewer}</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="status-chip">operator_console</span>
              <Link
                href="/admin/subscribers"
                className={cn(
                  "rounded-[6px] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]",
                  active === "subscribers"
                    ? "border-accent/40 bg-accentSoft text-accent"
                    : "border-line bg-surfaceMuted text-muted hover:border-accent/30 hover:text-accent"
                )}
              >
                Subscribers
              </Link>
              <Link
                href="/admin/inquiries"
                className={cn(
                  "rounded-[6px] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em]",
                  active === "inquiries"
                    ? "border-accent/40 bg-accentSoft text-accent"
                    : "border-line bg-surfaceMuted text-muted hover:border-accent/30 hover:text-accent"
                )}
              >
                Inquiries
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8">{children}</div>
    </div>
  );
}
