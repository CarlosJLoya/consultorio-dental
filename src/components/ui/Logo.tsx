export function Logo({ size = 40 }: { size?: number }) {
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
