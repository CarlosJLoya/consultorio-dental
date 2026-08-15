import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { marcarContactado, marcarCerrado, reabrirContacto, eliminarContacto } from "./actions";

const ESTADOS = [
  { value: "nuevo", label: "Nuevos" },
  { value: "contactado", label: "Contactados" },
  { value: "cerrado", label: "Cerrados" },
  { value: "todos", label: "Todos" },
] as const;

export default async function AdminContactosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado = "nuevo" } = await searchParams;
  const estadoActual = ESTADOS.some((e) => e.value === estado) ? estado : "nuevo";

  const contactos = await prisma.contacto.findMany({
    where: estadoActual === "todos" ? {} : { estado: estadoActual },
    include: { doctorInteres: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Contactos</h1>

      <div className="mt-4 flex gap-2">
        {ESTADOS.map((e) => (
          <Link
            key={e.value}
            href={`/admin/contactos?estado=${e.value}`}
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
        {contactos.map((contacto) => (
          <div key={contacto.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{contacto.nombre}</p>
                <p className="text-xs text-muted">
                  {contacto.telefono}
                  {contacto.email ? ` · ${contacto.email}` : ""} · {contacto.medioContacto} ·{" "}
                  {contacto.createdAt.toLocaleString("es-MX")}
                  {contacto.doctorInteres ? ` · Interés: ${contacto.doctorInteres.nombre} ${contacto.doctorInteres.apellido}` : ""}
                </p>
                {contacto.mensaje && <p className="mt-2 text-sm text-foreground">{contacto.mensaje}</p>}
              </div>
              <span className="shrink-0 rounded-full bg-background px-2 py-1 text-xs text-muted">{contacto.estado}</span>
            </div>

            <div className="mt-3 flex items-center gap-4">
              {contacto.estado !== "contactado" && (
                <form action={marcarContactado.bind(null, contacto.id)}>
                  <button type="submit" className="text-sm text-primary hover:underline">
                    Marcar contactado
                  </button>
                </form>
              )}
              {contacto.estado !== "cerrado" && (
                <form action={marcarCerrado.bind(null, contacto.id)}>
                  <button type="submit" className="text-sm text-success hover:underline">
                    Marcar cerrado
                  </button>
                </form>
              )}
              {contacto.estado !== "nuevo" && (
                <form action={reabrirContacto.bind(null, contacto.id)}>
                  <button type="submit" className="text-sm text-warning hover:underline">
                    Reabrir
                  </button>
                </form>
              )}
              <form action={eliminarContacto.bind(null, contacto.id)}>
                <ConfirmDeleteButton confirmText="¿Eliminar este contacto?" />
              </form>
            </div>
          </div>
        ))}

        {contactos.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-muted">
            No hay contactos en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
