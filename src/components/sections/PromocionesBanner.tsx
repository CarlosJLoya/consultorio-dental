import { prisma } from "@/lib/prisma";
import { estaVigente } from "@/lib/promociones";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export async function PromocionesBanner() {
  const promociones = await prisma.promocion.findMany({
    where: { activo: true },
    orderBy: { ordenDisplay: "asc" },
  });

  const ahora = new Date();
  const vigentes = promociones.filter((p) => estaVigente(p, ahora));

  if (vigentes.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-border bg-surface py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin] snap-x snap-mandatory">
          {vigentes.map((promo) => (
            <a
              key={promo.id}
              href={promo.enlaceExterno ?? "#contacto"}
              className="flex min-w-[280px] snap-start items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary"
            >
              <PlaceholderImage label="Banner" className="h-16 w-24 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{promo.titulo}</p>
                {promo.descripcion && <p className="text-xs text-muted">{promo.descripcion}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
