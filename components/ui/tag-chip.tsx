import Link from "next/link";
import { cn, slugify } from "@/lib/utils";

type TagChipProps = {
  tag: string;
  count?: number;
  active?: boolean;
  href?: string;
};

export function TagChip({ tag, count, active = false, href }: TagChipProps) {
  const target = href ?? `/tags/${slugify(tag)}`;

  return (
    <Link
      href={target}
      className={cn(
        "inline-flex items-center gap-2 rounded-[6px] border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        active
          ? "border-accent/40 bg-accentSoft text-accent"
          : "border-line bg-surfaceMuted text-muted hover:border-accent/30 hover:bg-surfaceStrong hover:text-accent"
      )}
    >
      <span>{tag}</span>
      {typeof count === "number" ? (
        <span className="border-l border-line pl-2 text-[10px] text-muted">{count}</span>
      ) : null}
    </Link>
  );
}
