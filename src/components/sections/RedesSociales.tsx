import { prisma } from "@/lib/prisma";

function nombrePlataforma(plataforma: string): string {
  return plataforma.charAt(0).toUpperCase() + plataforma.slice(1);
}

export async function RedesSociales() {
  const redes = await prisma.redSocial.findMany({
    where: { doctorId: null },
    orderBy: { orden: "asc" },
  });

  if (redes.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold text-foreground">Síguenos</h2>
        <p className="mt-2 text-muted">Fotos, promociones y novedades en nuestras redes.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {redes.map((red) => (
            <a
              key={red.id}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {nombrePlataforma(red.plataforma)}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 13 13 7M13 7H8m5 0v5" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
