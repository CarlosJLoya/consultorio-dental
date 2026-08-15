export function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-surface text-center text-xs text-muted ${className}`}
    >
      {label}
    </div>
  );
}
