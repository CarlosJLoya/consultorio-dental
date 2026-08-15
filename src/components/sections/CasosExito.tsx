import { prisma } from "@/lib/prisma";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export async function CasosExito() {
  const casos = await prisma.casoExito.findMany({
    where: { publicado: true },
    orderBy: { ordenDisplay: "asc" },
    include: { doctor: true },
  });

  if (casos.length === 0) {
    return null;
  }

  return (
    <section id="casos-exito" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground">Casos de éxito</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {casos.map((caso) => (
          <div key={caso.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="mb-1 font-medium text-foreground">{caso.titulo}</p>
            <p className="mb-3 text-xs text-muted">
              {caso.doctor.nombre} {caso.doctor.apellido}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <PlaceholderImage label="Antes" src={caso.fotoAntesUrl} className="aspect-square w-full" />
              <PlaceholderImage label="Después" src={caso.fotoDespuesUrl} className="aspect-square w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
