import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type VisitaPorDia = { dia: Date; total: bigint };

export default async function AdminEstadisticasPage() {
  const [totalVisitas, visitasHoy, porDia, porRuta] = await Promise.all([
    prisma.visitaPagina.count(),
    prisma.visitaPagina.count({
      where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    }),
    prisma.$queryRaw<VisitaPorDia[]>`
      SELECT DATE(created_at) AS dia, COUNT(*) AS total
      FROM visitas_pagina
      WHERE created_at >= NOW() - INTERVAL 30 DAY
      GROUP BY DATE(created_at)
      ORDER BY dia ASC
    `,
    prisma.visitaPagina.groupBy({
      by: ["ruta"],
      _count: { ruta: true },
      orderBy: { _count: { ruta: "desc" } },
      take: 10,
    }),
  ]);

  const maxDia = porDia.reduce((max, d) => Math.max(max, Number(d.total)), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Estadísticas de visitas</h1>
      <p className="mt-1 text-sm text-muted">Alcance del sitio público, medido desde este servidor.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-medium text-muted uppercase">Visitas totales</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{totalVisitas.toLocaleString("es-MX")}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-medium text-muted uppercase">Visitas hoy</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{visitasHoy.toLocaleString("es-MX")}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <p className="text-sm font-medium text-foreground">Últimos 30 días</p>
        {porDia.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Aún no hay visitas registradas en este periodo.</p>
        ) : (
          <div className="mt-4 flex h-32 items-end gap-1">
            {porDia.map((d) => {
              const total = Number(d.total);
              const altura = maxDia > 0 ? Math.max((total / maxDia) * 100, 4) : 4;
              const fecha = new Date(d.dia).toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit" });
              return (
                <div key={fecha} className="group relative flex-1">
                  <div
                    className="rounded-t bg-primary transition-colors group-hover:bg-primary-hover"
                    style={{ height: `${altura}%` }}
                  />
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {fecha}: {total}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <p className="text-sm font-medium text-foreground">Páginas más visitadas</p>
        {porRuta.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Aún no hay visitas registradas.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {porRuta.map((r) => (
              <div key={r.ruta} className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0">
                <span className="truncate text-foreground">{r.ruta}</span>
                <span className="ml-4 shrink-0 font-medium text-muted">{r._count.ruta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
