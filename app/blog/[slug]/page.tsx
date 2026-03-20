import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { TagChip } from "@/components/ui/tag-chip";
import { buildMetadata } from "@/lib/seo";
import {
  getPostBySlug,
  getPostSummaryBySlug,
  getPublicPosts,
  getRelatedPosts
} from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPublicPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostSummaryBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Post not found",
      path: `/blog/${slug}`
    });
  }

  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: post.canonicalPath,
    tags: post.tags,
    image: post.coverImage ? post.coverImage : `/blog/${post.slug}/opengraph-image`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags);

  return (
    <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-start">
        <article className="space-y-10">
          <header className="surface-panel overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-muted md:px-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="status-chip">essay</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingTime}</span>
              </div>
              <span>{post.updatedAt ? `updated_${formatDate(post.updatedAt)}` : "published"}</span>
            </div>

            <div className="space-y-6 px-5 py-6 md:px-8 md:py-8">
              <div className="space-y-4">
                <p className="eyebrow">document / {post.slug}.mdx</p>
                <h1 className="max-w-5xl text-[2.8rem] font-semibold leading-[0.95] tracking-[-0.07em] text-ink md:text-[4rem]">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-[14px] leading-8 text-muted">{post.excerpt}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>

              {post.coverImage ? (
                <div className="relative aspect-[16/8] overflow-hidden rounded-panel border border-line bg-surfaceMuted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover opacity-90"
                    sizes="(min-width: 1280px) 66vw, 100vw"
                  />
                </div>
              ) : null}
            </div>
          </header>

          <section className="surface-panel overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-muted md:px-8">
              <span>reader / public_render</span>
              <span>length / {post.readingTime}</span>
            </div>
            <div className="px-5 py-8 md:px-8 md:py-10">
              <div className="space-y-6">{post.content}</div>
            </div>
          </section>

          <section className="surface-panel p-6">
            <p className="eyebrow">newsletter / subscribe</p>
            <h2 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.05em] text-ink">
              Get the next field note when it ships
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-7 text-muted">
              New essays land here first, along with build notes on AI-native delivery and calm
              full-stack UX.
            </p>
            <div className="mt-5">
              <NewsletterForm source={`article:${post.slug}`} />
            </div>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="space-y-5">
              <div className="surface-panel p-6">
                <p className="eyebrow">related / reading</p>
                <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.05em] text-ink">
                  Continue down the same lane
                </h2>
                <p className="mt-3 max-w-2xl text-[13px] leading-7 text-muted">
                  Adjacent entries sharing the same implementation themes or research lane.
                </p>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.slug} post={relatedPost} compact />
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <div className="space-y-4 xl:sticky xl:top-28">
          {post.headings.length > 0 ? <TableOfContents headings={post.headings} /> : null}
          <div className="surface-panel p-5">
            <p className="eyebrow">browse / more</p>
            <p className="mt-3 text-[13px] leading-7 text-muted">
              Use the archive to move between published essays or jump straight into a specific tag lane.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/blog" className="terminal-link">
                open_archive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
