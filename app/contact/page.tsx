import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Reach out about technical writing systems, AI-native product work, or full-stack delivery.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1480px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <div className="surface-panel p-6">
            <p className="eyebrow">contact / intake</p>
            <h1 className="mt-4 text-[2.7rem] font-semibold tracking-[-0.06em] text-ink">
              Briefs that need both technical clarity and product taste.
            </h1>
            <p className="mt-4 max-w-xl text-[13px] leading-7 text-muted">
              Share the product context, delivery timeline, and where the current experience breaks
              down. Inquiries are stored in Postgres and routed to the protected admin queue.
            </p>
          </div>
          <div className="surface-panel-muted p-6">
            <p className="eyebrow">response / mode</p>
            <p className="mt-4 text-[13px] leading-7 text-muted">
              First replies are scoped, direct, and usually include the next technical question
              needed to unblock delivery.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.75fr]">
          <ContactForm />
          <div className="space-y-4">
            <div className="surface-panel-muted p-6">
              <p className="eyebrow">typical_scope</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-7 text-muted">
                <li>Technical blogs and documentation surfaces</li>
                <li>Client-facing product pages with stronger frontend taste</li>
                <li>Admin flows, validation, and calm operational tooling</li>
              </ul>
            </div>
            <div className="surface-panel-muted p-6">
              <p className="eyebrow">storage_path</p>
              <p className="mt-4 text-[13px] leading-7 text-muted">
                Submissions are validated server-side, stored through Prisma, and visible in the
                protected inquiry dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
