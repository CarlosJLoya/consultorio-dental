import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { estaVigente } from "@/lib/promociones";
import { eliminarPromocion } from "./actions";

export default async function AdminPromocionesPage() {
  const promociones = await prisma.promocion.findMany({ orderBy: { ordenDisplay: "asc" } });
  const ahora = new Date();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Promociones</h1>
        <Link
          href="/admin/promociones/nuevo"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Nueva promoción
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {promociones.map((promocion) => {
          const enVigencia = estaVigente(promocion, ahora);

          return (
            <div key={promocion.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
              <div>
                <p className="font-medium text-foreground">{promocion.titulo}</p>
                <p className="text-xs text-muted">
                  {promocion.fechaInicio.toLocaleDateString("es-MX", { timeZone: "UTC" })} –{" "}
                  {promocion.fechaFin.toLocaleDateString("es-MX", { timeZone: "UTC" })} ·{" "}
                  {enVigencia ? (
                    <span className="text-success">Vigente ahora</span>
                  ) : promocion.activo ? (
                    <span>Fuera de fecha</span>
                  ) : (
                    <span>Pausada</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/promociones/${promocion.id}`} className="text-sm text-primary hover:underline">
                  Editar
                </Link>
                <form action={eliminarPromocion.bind(null, promocion.id)}>
                  <ConfirmDeleteButton confirmText={`¿Eliminar la promoción "${promocion.titulo}"?`} />
                </form>
              </div>
            </div>
          );
        })}

        {promociones.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            Aún no hay promociones registradas.
          </p>
        )}
      </div>
    </div>
  );
}
