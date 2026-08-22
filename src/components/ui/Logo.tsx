export function Logo({
  size = 40,
  src,
  srcDark,
}: {
  size?: number;
  src?: string | null;
  srcDark?: string | null;
}) {
  if (src) {
    return (
      <span style={{ width: size, height: size }} className="relative inline-block shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Logo"
          className={`h-full w-full rounded-xl object-contain ${srcDark ? "dark:hidden" : ""}`}
        />
        {srcDark && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcDark}
            alt="Logo"
            className="absolute inset-0 hidden h-full w-full rounded-xl object-contain dark:block"
          />
        )}
      </span>
    );
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
