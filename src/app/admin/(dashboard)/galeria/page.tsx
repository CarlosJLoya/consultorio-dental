import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { eliminarFoto } from "./actions";

export default async function AdminGaleriaPage() {
  const fotos = await prisma.galeria.findMany({ orderBy: { ordenDisplay: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Galería</h1>
        <Link
          href="/admin/galeria/nuevo"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Nueva foto
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fotos.map((foto) => (
          <div key={foto.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="truncate text-sm font-medium text-foreground">{foto.titulo ?? "(sin título)"}</p>
            <p className="mt-1 truncate text-xs text-muted">{foto.url}</p>
            <p className="mt-1 text-xs text-muted">
              {foto.categoria ?? "sin categoría"} · {foto.publicado ? <span className="text-success">Publicada</span> : "Sin publicar"}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Link href={`/admin/galeria/${foto.id}`} className="text-sm text-primary hover:underline">
                Editar
              </Link>
              <form action={eliminarFoto.bind(null, foto.id)}>
                <ConfirmDeleteButton confirmText="¿Eliminar esta foto?" />
              </form>
            </div>
          </div>
        ))}

        {fotos.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-border p-6 text-center text-muted">
            Aún no hay fotos en la galería.
          </p>
        )}
      </div>
    </div>
  );
}
