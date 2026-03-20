import type { Metadata } from "next";
import { AdminShell } from "@/components/layout/admin-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/auth/admin";
import { listContactInquiries } from "@/lib/repository";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Admin Inquiries",
  description: "Protected contact inquiry queue.",
  path: "/admin/inquiries"
});

export default async function AdminInquiriesPage() {
  const [viewer, inquiries] = await Promise.all([requireAdmin(), listContactInquiries()]);

  return (
    <AdminShell
      viewer={viewer.fullName}
      active="inquiries"
      title="Client inquiries"
      description="Contact submissions are validated server-side and stored in Postgres, with a fallback demo adapter available for local preview and e2e runs."
    >
      <div className="surface-panel overflow-hidden">
        <div className="border-b border-line px-6 py-4">
          <p className="eyebrow">inbound_queue</p>
        </div>
        {inquiries.length > 0 ? (
          <div className="divide-y divide-line">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="grid gap-4 px-6 py-5 xl:grid-cols-[0.45fr_0.55fr]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-[1.1rem] font-semibold tracking-[-0.03em] text-ink">
                      {inquiry.name}
                    </h2>
                    <span className="rounded-[6px] border border-line bg-surfaceMuted px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-muted">{inquiry.email}</p>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-muted">
                    {inquiry.company ?? "Independent"} {inquiry.budgetRange ? `· ${inquiry.budgetRange}` : ""}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-[13px] leading-7 text-muted">{inquiry.message}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Received {formatDate(inquiry.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              eyebrow="Quiet queue"
              title="No inquiries yet."
              copy="Use the contact form to verify the write path and populate the protected admin view."
            />
          </div>
        )}
      </div>
    </AdminShell>
  );
}
