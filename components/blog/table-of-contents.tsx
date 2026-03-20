import type { PostHeading } from "@/lib/posts";

type TableOfContentsProps = {
  headings: PostHeading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <aside className="surface-panel p-5">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <p className="eyebrow">File outline</p>
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
          {headings.length} items
        </span>
      </div>
      <ol className="mt-4 space-y-3 text-[13px] leading-6 text-muted">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "border-l border-line pl-4" : undefined}>
            <a href={`#${heading.id}`} className="transition-colors hover:text-accent">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
