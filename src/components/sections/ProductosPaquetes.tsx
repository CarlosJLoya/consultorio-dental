import { prisma } from "@/lib/prisma";

export async function ProductosPaquetes() {
  const paquetes = await prisma.productoPaquete.findMany({
    where: { activo: true },
    orderBy: { ordenDisplay: "asc" },
  });

  if (paquetes.length === 0) {
    return null;
  }

  return (
    <section id="paquetes" className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-foreground">Servicios y paquetes</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paquetes.map((paquete) => (
            <div key={paquete.id} className="flex flex-col rounded-xl border border-border bg-background p-6">
              <p className="font-semibold text-foreground">
                {paquete.nombre}
                {paquete.destacado && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Destacado</span>
                )}
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">${paquete.precio.toString()}</p>
              {paquete.descripcion && <p className="mt-2 flex-1 text-sm text-muted">{paquete.descripcion}</p>}
              <a
                href="#contacto"
                className="mt-4 rounded-lg border border-border px-4 py-2 text-center text-sm font-medium text-foreground hover:border-primary"
              >
                Preguntar por WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
