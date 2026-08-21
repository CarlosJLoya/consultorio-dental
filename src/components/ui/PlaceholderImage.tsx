export function PlaceholderImage({
  label,
  src,
  className = "",
  fit = "cover",
}: {
  label: string;
  src?: string | null;
  className?: string;
  fit?: "cover" | "contain";
}) {
  if (src) {
    const fitClass = fit === "contain" ? "object-contain" : "object-cover";
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className={`rounded-xl ${fitClass} ${className}`} />;
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-surface text-center text-xs text-muted ${className}`}
    >
      {label}
    </div>
  );
}
