import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { formatHora } from "@/lib/citas";
import { confirmarCita, cancelarCita, eliminarCita } from "./actions";

export const dynamic = "force-dynamic";

const ESTADOS = [
  { value: "pendiente", label: "Pendientes" },
  { value: "confirmada", label: "Confirmadas" },
  { value: "cancelada", label: "Canceladas" },
  { value: "todos", label: "Todas" },
] as const;

export default async function AdminCitasPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado = "pendiente" } = await searchParams;
  const estadoActual = ESTADOS.some((e) => e.value === estado) ? estado : "pendiente";

  const citas = await prisma.cita.findMany({
    where: estadoActual === "todos" ? {} : { estado: estadoActual },
    include: { doctor: true },
    orderBy: [{ fecha: "asc" }, { hora: "asc" }],
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Citas</h1>

      <div className="mt-4 flex gap-2">
        {ESTADOS.map((e) => (
          <Link
            key={e.value}
            href={`/admin/citas?estado=${e.value}`}
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
        {citas.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">
                  {c.fecha.toLocaleDateString("es-MX", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  })}{" "}
                  ·{" "}
                  {formatHora(c.hora)}
                </p>
                <p className="text-xs text-muted">
                  Doctor: {c.doctor.nombre} {c.doctor.apellido}
                </p>
                <p className="mt-2 text-sm text-foreground">
                  {c.nombrePaciente}
                  {c.telefono && (
                    <>
                      {" · "}
                      <a
                        href={`https://wa.me/${c.telefono}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {c.telefono}
                      </a>
                    </>
                  )}
                  {c.email && (
                    <>
                      {" · "}
                      <a href={`mailto:${c.email}`} className="text-primary hover:underline">
                        {c.email}
                      </a>
                    </>
                  )}
                </p>
                {c.notas && <p className="mt-1 text-sm text-muted">{c.notas}</p>}
              </div>

              <span className="shrink-0 rounded-full bg-background px-2 py-1 text-xs text-muted">{c.estado}</span>
            </div>

            <div className="mt-3 flex items-center gap-4">
              {c.estado !== "confirmada" && (
                <form action={confirmarCita.bind(null, c.id)}>
                  <button type="submit" className="text-sm text-success hover:underline">
                    Confirmar
                  </button>
                </form>
              )}
              {c.estado !== "cancelada" && (
                <form action={cancelarCita.bind(null, c.id)}>
                  <button type="submit" className="text-sm text-warning hover:underline">
                    Cancelar
                  </button>
                </form>
              )}
              <form action={eliminarCita.bind(null, c.id)}>
                <ConfirmDeleteButton confirmText="¿Eliminar esta cita?" />
              </form>
            </div>
          </div>
        ))}

        {citas.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            No hay citas en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
