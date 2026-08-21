import { prisma } from "@/lib/prisma";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export async function InstalacionesAlternadas() {
  const fotos = await prisma.galeria.findMany({
    where: { publicado: true },
    orderBy: { ordenDisplay: "asc" },
    take: 4,
  });

  if (fotos.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-foreground">Conoce nuestro consultorio</h2>

      <div className="mt-10 flex flex-col gap-12">
        {fotos.map((foto, index) => {
          const invertido = index % 2 === 1;

          return (
            <div
              key={foto.id}
              className={`grid gap-6 sm:grid-cols-2 sm:items-center ${invertido ? "sm:[&>*:first-child]:order-2" : ""}`}
            >
              <PlaceholderImage label={foto.categoria ?? "Foto del consultorio"} src={foto.url} className="aspect-[4/3] w-full" />
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {foto.titulo ?? "Título pendiente de definir"}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {foto.descripcion ?? "Descripción breve de esta parte del consultorio, pendiente de definir."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
