export function Estrellas({ calificacion }: { calificacion: number }) {
  const llenas = Math.round(calificacion);

  return (
    <div className="flex gap-0.5 text-warning" aria-label={`${calificacion} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < llenas ? "currentColor" : "none"} stroke="currentColor">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}
