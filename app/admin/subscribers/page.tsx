import type { Metadata } from "next";
import { AdminShell } from "@/components/layout/admin-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/auth/admin";
import { listSubscribers } from "@/lib/repository";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Admin Subscribers",
  description: "Protected subscriber capture queue.",
  path: "/admin/subscribers"
});

export default async function AdminSubscribersPage() {
  const [viewer, subscribers] = await Promise.all([requireAdmin(), listSubscribers()]);

  return (
    <AdminShell
      viewer={viewer.fullName}
      active="subscribers"
      title="Subscriber queue"
      description="New newsletter captures are written to Postgres through Prisma. Duplicate active subscriptions are handled gracefully."
    >
      <div className="grid gap-4 xl:grid-cols-[0.4fr_0.6fr]">
        <div className="surface-panel p-6">
          <p className="eyebrow">overview / totals</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-end justify-between gap-3">
              <span className="text-[12px] uppercase tracking-[0.18em] text-muted">
                total_subscribers
              </span>
              <span className="font-mono text-[2.5rem] tracking-[-0.06em] text-ink">
                {subscribers.length}
              </span>
            </div>
            <p className="text-[13px] leading-7 text-muted">
              Sources are stored alongside subscriber records so future acquisition analysis can stay
              tied to the capture path.
            </p>
          </div>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="border-b border-line px-6 py-4">
            <p className="eyebrow">recent_captures</p>
          </div>
          {subscribers.length > 0 ? (
            <div className="divide-y divide-line">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-ink">{subscriber.email}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-muted">
                      {subscriber.source}
                    </p>
                  </div>
                  <div className="text-[12px] text-muted">
                    <span className="rounded-[6px] border border-line bg-surfaceMuted px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em]">
                      {subscriber.status}
                    </span>
                    <span className="ml-3">{formatDate(subscriber.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6">
              <EmptyState
                eyebrow="No captures"
                title="No subscriber records yet."
                copy="Use the homepage or article newsletter forms to capture the first email address."
              />
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
