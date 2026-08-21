export function Logo({ size = 40, src }: { size?: number; src?: string | null }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="Logo" style={{ width: size, height: size }} className="shrink-0 rounded-xl object-contain" />;
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-xl border border-dashed border-border bg-surface text-[10px] text-muted"
      aria-label="Logo del consultorio (pendiente)"
    >
      LOGO
    </div>
  );
}
