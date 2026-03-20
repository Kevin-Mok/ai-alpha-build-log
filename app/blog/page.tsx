import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import { buildMetadata } from "@/lib/seo";
import { getAllTags, getPublicPosts } from "@/lib/posts";
import { slugify } from "@/lib/utils";

type BlogPageProps = {
  searchParams?: Promise<{
    tag?: string;
  }>;
};

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Technical essays, field notes, and AI-native full-stack build logs.",
  path: "/blog"
});

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeTag = resolvedSearchParams?.tag ?? "";
  const [posts, tags] = await Promise.all([getPublicPosts(), getAllTags()]);

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.some((tag) => slugify(tag) === activeTag))
    : posts;

  return (
    <div className="mx-auto max-w-[1480px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
      <Reveal>
        <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="surface-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="eyebrow">archive / index</p>
              <span className="status-chip">{filteredPosts.length}_results</span>
            </div>
            <h1 className="mt-6 text-[2.6rem] font-semibold tracking-[-0.06em] text-ink">
              Long-form technical writing
            </h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-7 text-muted">
              Published MDX essays only. Drafts stay out of public routes until they are ready to
              ship. Filters stay shallow and command-like rather than becoming a heavy taxonomy UI.
            </p>
          </div>
          <div className="surface-panel-muted p-5">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <p className="eyebrow">filter / lanes</p>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {activeTag || "all"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-start gap-3">
              <Link
                href="/blog"
                className={`rounded-[6px] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] ${
                  !activeTag
                    ? "border-accent/40 bg-accentSoft text-accent"
                    : "border-line bg-surface text-muted hover:border-accent/30 hover:text-accent"
                }`}
              >
                All posts
              </Link>
              {tags.map((entry) => (
                <TagChip
                  key={entry.tag}
                  tag={entry.tag}
                  count={entry.count}
                  active={activeTag === slugify(entry.tag)}
                  href={`/blog?tag=${slugify(entry.tag)}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <section className="grid gap-4 xl:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 60}>
              <PostCard post={post} />
            </Reveal>
          ))
        ) : (
          <div className="lg:col-span-2">
            <EmptyState
              eyebrow="No matches"
              title="No published posts match that tag yet."
              copy="Choose another lane from the filter set or clear the active tag to return to the full archive."
            />
          </div>
        )}
      </section>
    </div>
  );
}
