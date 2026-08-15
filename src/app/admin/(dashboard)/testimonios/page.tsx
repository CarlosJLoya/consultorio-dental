import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { aprobarTestimonio, rechazarTestimonio, eliminarTestimonio } from "./actions";

const ESTADOS = [
  { value: "pendiente", label: "Pendientes" },
  { value: "aprobado", label: "Aprobados" },
  { value: "rechazado", label: "Rechazados" },
  { value: "todos", label: "Todos" },
] as const;

export default async function AdminTestimoniosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado = "pendiente" } = await searchParams;
  const estadoActual = ESTADOS.some((e) => e.value === estado) ? estado : "pendiente";

  const testimonios = await prisma.testimonio.findMany({
    where: estadoActual === "todos" ? {} : { estado: estadoActual },
    include: { doctor: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Testimonios</h1>

      <div className="mt-4 flex gap-2">
        {ESTADOS.map((e) => (
          <Link
            key={e.value}
            href={`/admin/testimonios?estado=${e.value}`}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              estadoActual === e.value
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted hover:border-primary"
            }`}
          >
            {e.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {testimonios.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">
                  {t.nombrePaciente} · {"★".repeat(t.calificacion)}
                  {"☆".repeat(5 - t.calificacion)}
                </p>
                <p className="text-xs text-muted">
                  {t.doctor ? `Doctor: ${t.doctor.nombre} ${t.doctor.apellido}` : "Comentario general"} ·{" "}
                  {t.createdAt.toLocaleDateString("es-MX")}
                </p>
                <p className="mt-2 text-sm text-foreground">{t.comentario}</p>
                {t.videoUrl && (
                  <a href={t.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-primary hover:underline">
                    Ver video
                  </a>
                )}
              </div>

              <span className="shrink-0 rounded-full bg-background px-2 py-1 text-xs text-muted">{t.estado}</span>
            </div>

            <div className="mt-3 flex items-center gap-4">
              {t.estado !== "aprobado" && (
                <form action={aprobarTestimonio.bind(null, t.id)}>
                  <button type="submit" className="text-sm text-success hover:underline">
                    Aprobar
                  </button>
                </form>
              )}
              {t.estado !== "rechazado" && (
                <form action={rechazarTestimonio.bind(null, t.id)}>
                  <button type="submit" className="text-sm text-warning hover:underline">
                    Rechazar
                  </button>
                </form>
              )}
              <form action={eliminarTestimonio.bind(null, t.id)}>
                <ConfirmDeleteButton confirmText="¿Eliminar este testimonio?" />
              </form>
            </div>
          </div>
        ))}

        {testimonios.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            No hay testimonios en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
