import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "How AI Blog approaches full-stack delivery, technical writing, and client-facing product work.",
  path: "/about"
});

const workingLanes = [
  {
    title: "Technical writing that understands the stack",
    copy: "Long-form content built from shipping systems, not detached content calendars."
  },
  {
    title: "Frontend execution with restraint",
    copy: "Interfaces that feel considered, readable, and durable instead of generic AI SaaS templates."
  },
  {
    title: "Backend pragmatism",
    copy: "Schema, auth, persistence, and validation handled with production defaults rather than demo shortcuts."
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1480px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
      <Reveal>
        <section className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="surface-panel p-6">
            <p className="eyebrow">about / briefing</p>
            <h1 className="mt-4 text-[2.8rem] font-semibold tracking-[-0.06em] text-ink">
              Built for freelance clients and recruiter screens that need more than a brochure.
            </h1>
          </div>
          <div className="surface-panel-muted p-6">
            <p className="text-[14px] leading-8 text-muted">
              AI Blog is intentionally blog-first. The writing workflow stays in version-controlled
              MDX, while the app still ships the product details that matter: persistence, validated
              forms, auth-gated admin routes, metadata, feeds, and performance-conscious UI.
            </p>
          </div>
        </section>
      </Reveal>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="surface-panel p-6">
          <p className="eyebrow">positioning / why this exists</p>
          <div className="mt-5 space-y-4 text-[13px] leading-7 text-muted">
            <p>
              This project shows the overlap between product engineering and writing: content systems,
              technical clarity, and UI taste all wired into the same build.
            </p>
            <p>
              The stack is deliberately practical for client work: Next.js, Tailwind, Supabase,
              Postgres, Prisma, and a testable content pipeline.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {workingLanes.map((lane) => (
            <div key={lane.title} className="surface-panel-muted p-6">
              <h2 className="text-[1rem] font-semibold tracking-[-0.03em] text-ink">{lane.title}</h2>
              <p className="mt-3 text-[13px] leading-7 text-muted">{lane.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
