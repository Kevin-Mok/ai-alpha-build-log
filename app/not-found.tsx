import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[920px] px-4 py-16 sm:px-6 lg:px-10">
      <div className="surface-panel p-6 text-center md:p-8">
        <p className="eyebrow">error / 404</p>
        <h1 className="mt-4 text-[2.8rem] font-semibold tracking-[-0.06em] text-ink">
          That route does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[13px] leading-7 text-muted">
          Published essays, tag lanes, and admin routes are available from the main navigation.
        </p>
        <div className="mt-8">
          <Link href="/blog" className={buttonClassName("primary")}>
            Back to the archive
          </Link>
        </div>
      </div>
    </div>
  );
}
