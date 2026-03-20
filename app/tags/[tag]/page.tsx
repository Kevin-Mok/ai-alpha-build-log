import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { buildMetadata } from "@/lib/seo";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((entry) => ({
    tag: entry.href.split("/").pop() ?? entry.tag
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;

  return buildMetadata({
    title: `Tag: ${tag}`,
    description: `Published essays filed under ${tag}.`,
    path: `/tags/${tag}`
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  const label = posts.find((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag))
    ?.tags[0] ?? posts[0].tags.find((postTag) => postTag.toLowerCase().replace(/\s+/g, "-") === tag) ?? tag;

  return (
    <div className="mx-auto max-w-[1480px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
      <section className="surface-panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="eyebrow">tag_lane / {label}</p>
          <span className="status-chip">{posts.length}_entries</span>
        </div>
        <h1 className="mt-6 text-[2.7rem] font-semibold tracking-[-0.06em] text-ink">{label}</h1>
        <p className="mt-4 max-w-2xl text-[13px] leading-7 text-muted">
          Published essays connected by a shared implementation theme or research lane.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
