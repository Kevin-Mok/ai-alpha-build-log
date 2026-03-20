import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from "react";
import { cn } from "@/lib/utils";

function MdxLink({
  className,
  href = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const sharedClassName = cn(
    "underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent",
    className
  );

  if (href.startsWith("http")) {
    return <a className={sharedClassName} href={href} {...props} />;
  }

  return (
    <Link className={sharedClassName} href={href} {...props}>
      {props.children}
    </Link>
  );
}

export const mdxComponents = {
  a: MdxLink,
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-16 scroll-mt-28 text-[1.6rem] font-semibold leading-tight tracking-[-0.04em] text-ink",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-10 scroll-mt-28 text-[1.2rem] font-semibold leading-tight tracking-[-0.03em] text-ink",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("max-w-[68ch] text-[0.96rem] leading-8 text-[#c4d0dc]", className)} {...props} />
  ),
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 max-w-[68ch] list-disc space-y-2 pl-6 text-[#c4d0dc]", className)} {...props} />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 max-w-[68ch] list-decimal space-y-2 pl-6 text-[#c4d0dc]", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "my-8 max-w-[68ch] border-l-2 border-accent/40 pl-5 text-[0.98rem] leading-8 text-muted",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-8 overflow-x-auto rounded-panel border border-line bg-surfaceMuted px-5 py-4 text-sm text-[#dce7f1] shadow-panel",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded-[4px] bg-accentSoft px-1.5 py-0.5 font-mono text-[0.92em] text-accent",
        className
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
  table: ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-hidden rounded-panel border border-line">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("border-b border-line bg-surfaceStrong px-4 py-3 font-medium text-ink", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn("border-b border-line px-4 py-3 text-muted", className)} {...props} />
  )
};
