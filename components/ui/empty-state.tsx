type EmptyStateProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function EmptyState({ eyebrow, title, copy }: EmptyStateProps) {
  return (
    <div className="surface-panel-muted border-dashed px-6 py-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[1.05rem] font-semibold tracking-[-0.03em] text-ink">{title}</h2>
      <p className="mt-3 max-w-xl text-[13px] leading-7 text-muted">{copy}</p>
    </div>
  );
}
