import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { TagChip } from "@/components/ui/tag-chip";

type PostCardProps = {
  post: PostSummary;
  compact?: boolean;
};

export function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <article className="group surface-panel overflow-hidden transition-colors hover:border-accent/30">
      {post.coverImage ? (
        <div className="border-b border-line px-3 py-3">
          <div className={compact ? "relative aspect-[16/8] overflow-hidden rounded-[6px] border border-line bg-surfaceMuted" : "relative aspect-[16/9] overflow-hidden rounded-[6px] border border-line bg-surfaceMuted"}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      ) : null}

      <div className="space-y-4 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="status-chip bg-transparent text-muted">{compact ? "entry" : "essay"}</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="space-y-3">
          <h3
            className={
              compact
                ? "text-[1.25rem] font-semibold leading-tight tracking-[-0.04em] text-ink"
                : "text-[1.55rem] font-semibold leading-tight tracking-[-0.05em] text-ink"
            }
          >
            <Link href={post.canonicalPath} className="transition-colors hover:text-accent">
              {post.title}
            </Link>
          </h3>
          <p className="max-w-[64ch] text-[13px] leading-7 text-muted">{post.excerpt}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
          <span className="ml-auto hidden text-[11px] uppercase tracking-[0.18em] text-accent sm:inline">
            open_entry
          </span>
        </div>
      </div>
    </article>
  );
}
