import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { eliminarCasoExito } from "./actions";

export default async function AdminCasosExitoPage() {
  const [casos, totalDoctores] = await Promise.all([
    prisma.casoExito.findMany({ orderBy: { ordenDisplay: "asc" }, include: { doctor: true } }),
    prisma.doctor.count(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Casos de éxito</h1>
        {totalDoctores > 0 && (
          <Link
            href="/admin/casos-exito/nuevo"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Nuevo caso
          </Link>
        )}
      </div>

      {totalDoctores === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-border p-6 text-center text-muted">
          Primero registra al menos un <Link href="/admin/doctores" className="text-primary hover:underline">doctor</Link> para poder crear casos de éxito.
        </p>
      )}

      <div className="mt-6 grid gap-4">
        {casos.map((caso) => (
          <div key={caso.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div>
              <p className="font-medium text-foreground">{caso.titulo}</p>
              <p className="text-xs text-muted">
                {caso.doctor.nombre} {caso.doctor.apellido} · {caso.tratamiento ?? "sin tratamiento especificado"} ·{" "}
                {caso.publicado ? <span className="text-success">Publicado</span> : <span>Sin publicar</span>}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/casos-exito/${caso.id}`} className="text-sm text-primary hover:underline">
                Editar
              </Link>
              <form action={eliminarCasoExito.bind(null, caso.id)}>
                <ConfirmDeleteButton confirmText={`¿Eliminar el caso "${caso.titulo}"?`} />
              </form>
            </div>
          </div>
        ))}

        {casos.length === 0 && totalDoctores > 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            Aún no hay casos de éxito registrados.
          </p>
        )}
      </div>
    </div>
  );
}
