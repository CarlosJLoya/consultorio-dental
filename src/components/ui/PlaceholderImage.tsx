export function PlaceholderImage({
  label,
  src,
  className = "",
}: {
  label: string;
  src?: string | null;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className={`rounded-xl object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-surface text-center text-xs text-muted ${className}`}
    >
      {label}
    </div>
  );
}
