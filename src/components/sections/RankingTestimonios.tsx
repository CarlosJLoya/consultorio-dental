import { prisma } from "@/lib/prisma";
import { Estrellas } from "@/components/ui/Estrellas";
import { TestimonioForm } from "@/components/sections/TestimonioForm";

export async function RankingTestimonios() {
  const [testimonios, doctores] = await Promise.all([
    prisma.testimonio.findMany({
      where: { estado: "aprobado" },
      orderBy: [{ calificacion: "desc" }, { createdAt: "desc" }],
    }),
    prisma.doctor.findMany({ where: { activo: true }, orderBy: { nombre: "asc" } }),
  ]);

  const promedio =
    testimonios.length > 0 ? testimonios.reduce((suma, t) => suma + t.calificacion, 0) / testimonios.length : 0;
  const mejores = testimonios.slice(0, 3);

  return (
    <section id="testimonios" className="mx-auto max-w-6xl px-4 py-16">
      {testimonios.length > 0 && (
        <>
          <div className="flex flex-col items-center text-center">
            <p className="text-5xl font-bold text-foreground">{promedio.toFixed(1)}</p>
            <Estrellas calificacion={promedio} />
            <p className="mt-1 text-sm text-muted">
              Basado en {testimonios.length} {testimonios.length === 1 ? "reseña" : "reseñas"}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {mejores.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-surface p-4">
                <Estrellas calificacion={t.calificacion} />
                <p className="mt-2 text-sm text-foreground">"{t.comentario}"</p>
                <p className="mt-3 text-xs font-medium text-muted">{t.nombrePaciente}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <TestimonioForm doctores={doctores} />
    </section>
  );
}
