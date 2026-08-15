import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { eliminarPaquete } from "./actions";

export default async function AdminPaquetesPage() {
  const paquetes = await prisma.productoPaquete.findMany({
    orderBy: { ordenDisplay: "asc" },
    include: { doctor: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Paquetes y precios</h1>
        <Link
          href="/admin/paquetes/nuevo"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Nuevo paquete
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 font-medium text-muted">Nombre</th>
              <th className="px-4 py-3 font-medium text-muted">Precio</th>
              <th className="px-4 py-3 font-medium text-muted">Doctor</th>
              <th className="px-4 py-3 font-medium text-muted">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {paquetes.map((paquete) => (
              <tr key={paquete.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">
                  {paquete.nombre}
                  {paquete.destacado && <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Destacado</span>}
                </td>
                <td className="px-4 py-3 text-muted">${paquete.precio.toString()}</td>
                <td className="px-4 py-3 text-muted">
                  {paquete.doctor ? `${paquete.doctor.nombre} ${paquete.doctor.apellido}` : "General"}
                </td>
                <td className="px-4 py-3">
                  <span className={paquete.activo ? "text-success" : "text-muted"}>
                    {paquete.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/paquetes/${paquete.id}`} className="text-sm text-primary hover:underline">
                      Editar
                    </Link>
                    <form action={eliminarPaquete.bind(null, paquete.id)}>
                      <ConfirmDeleteButton confirmText={`¿Eliminar "${paquete.nombre}"?`} />
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {paquetes.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Aún no hay paquetes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
