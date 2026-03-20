import Link from "next/link";
import { ArrowRight, DownloadSimple, Notebook } from "@phosphor-icons/react/dist/ssr";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/ui/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import { buttonClassName } from "@/components/ui/button";
import { getAllTags, getFeaturedPosts, getLatestPosts } from "@/lib/posts";

export default async function HomePage() {
  const [featuredPosts, latestPosts, tags] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(4),
    getAllTags()
  ]);

  const leadPost = featuredPosts[0] ?? latestPosts[0];
  const secondaryPosts = latestPosts.filter((post) => post.slug !== leadPost?.slug).slice(0, 2);
  const workspaceStats = [
    { label: "published_entries", value: latestPosts.length },
    { label: "tag_lanes", value: tags.length },
    { label: "featured_notes", value: featuredPosts.length }
  ];

  return (
    <div className="mx-auto max-w-[1480px] space-y-12 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Reveal>
        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="surface-panel p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="eyebrow">workspace / overview</p>
              <span className="status-chip">cli_dark_theme</span>
            </div>
            <div className="grid gap-8 pt-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.07em] text-ink md:text-[4.75rem]">
                    Technical essays and build notes framed like a calm terminal workspace.
                  </h1>
                  <p className="max-w-2xl text-[14px] leading-8 text-muted">
                    AI Blog is a Markdown-first technical studio: long-form writing, subscriber
                    capture, Supabase-authenticated admin tools, and production-fluent UI details
                    presented through a dark command-surface system.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/blog" className={buttonClassName("primary")}>
                    Open archive
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                  <Link href="/about" className={buttonClassName("secondary")}>
                    Read briefing
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {workspaceStats.map((stat) => (
                  <div key={stat.label} className="surface-panel-muted px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{stat.label}</p>
                    <p className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-ink">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-panel p-6">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-line pb-4">
                <div>
                  <p className="eyebrow">queue / inbox</p>
                  <h2 className="mt-2 text-[1.45rem] font-semibold tracking-[-0.05em] text-ink">
                    Product notes, build logs, calm release notes
                  </h2>
                </div>
                <Notebook size={24} weight="duotone" className="text-accent" />
              </div>
              <NewsletterForm source="homepage" />
            </div>

            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="surface-panel-muted p-6">
                <p className="eyebrow">stack / runtime</p>
                <ul className="mt-4 space-y-3 text-[13px] leading-7 text-muted">
                  <li>Next.js App Router with Server Components first</li>
                  <li>Repo-native MDX with typed frontmatter validation</li>
                  <li>Supabase auth and Postgres persistence through Prisma</li>
                </ul>
              </div>
              <div className="surface-panel-muted flex flex-col justify-between p-6">
                <div>
                  <p className="eyebrow">focus / now</p>
                  <p className="mt-4 text-[13px] leading-7 text-muted">
                    Client-facing technical writing, AI workflow case studies, and the details that
                    make full-stack delivery feel dependable.
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-accent">
                  <DownloadSimple size={14} weight="bold" />
                  build_ready / v1
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {leadPost ? (
        <Reveal delay={60}>
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">featured / entry</p>
                <Link href="/blog" className="terminal-link">
                  browse_archive
                </Link>
              </div>
              <PostCard post={leadPost} />
            </div>
            <div className="grid gap-4">
              {secondaryPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 60}>
                  <PostCard post={post} compact />
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal delay={100}>
        <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="surface-panel p-6">
            <p className="eyebrow">topic_lanes</p>
            <h2 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.05em] text-ink">
              Research organized as narrow implementation lanes instead of trend-chasing categories.
            </h2>
            <p className="mt-4 max-w-xl text-[13px] leading-7 text-muted">
              Each tag page acts like a focused command namespace: product engineering, AI workflow
              design, frontend systems, and long-form documentation practice.
            </p>
          </div>
          <div className="surface-panel flex flex-wrap gap-3 p-6">
            {tags.map((entry) => (
              <TagChip key={entry.tag} tag={entry.tag} count={entry.count} href={entry.href} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
