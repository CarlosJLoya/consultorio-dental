"use client";

import { useEffect, useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

type Foto = {
  id: number;
  url: string;
  titulo: string | null;
  descripcion: string | null;
};

export function CategoriaCarrusel({ fotos, invertido }: { fotos: Foto[]; invertido?: boolean }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (fotos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalo = setInterval(() => {
      setIndice((i) => (i + 1) % fotos.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [fotos.length]);

  const actual = fotos[indice];

  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 sm:items-center ${invertido ? "sm:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        {fotos.map((foto, i) => (
          <PlaceholderImage
            key={foto.id}
            label={foto.titulo ?? "Foto del consultorio"}
            src={foto.url}
            className={`carousel-fade absolute inset-0 h-full w-full ${i === indice ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {fotos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {fotos.map((foto, i) => (
              <button
                key={foto.id}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => setIndice(i)}
                className={`carousel-fade h-1.5 rounded-full ${i === indice ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="text-xl font-bold text-foreground">{actual.titulo ?? "Título pendiente de definir"}</h4>
        <p className="mt-2 text-base leading-relaxed text-muted">
          {actual.descripcion ?? "Descripción breve de esta parte del consultorio, pendiente de definir."}
        </p>
      </div>
    </div>
  );
}
