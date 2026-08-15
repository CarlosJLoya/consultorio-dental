import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { eliminarDoctor } from "./actions";

export default async function AdminDoctoresPage() {
  const doctores = await prisma.doctor.findMany({
    orderBy: { ordenDisplay: "asc" },
    include: { especialidades: { include: { especialidad: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Doctores</h1>
        <Link
          href="/admin/doctores/nuevo"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Nuevo doctor
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 font-medium text-muted">Nombre</th>
              <th className="px-4 py-3 font-medium text-muted">Especialidades</th>
              <th className="px-4 py-3 font-medium text-muted">Orden</th>
              <th className="px-4 py-3 font-medium text-muted">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {doctores.map((doctor) => (
              <tr key={doctor.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">
                  {doctor.nombre} {doctor.apellido}
                </td>
                <td className="px-4 py-3 text-muted">
                  {doctor.especialidades.map((e) => e.especialidad.nombre).join(", ") || "—"}
                </td>
                <td className="px-4 py-3 text-muted">{doctor.ordenDisplay}</td>
                <td className="px-4 py-3">
                  <span className={doctor.activo ? "text-success" : "text-muted"}>
                    {doctor.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/doctores/${doctor.id}`} className="text-sm text-primary hover:underline">
                      Editar
                    </Link>
                    <form action={eliminarDoctor.bind(null, doctor.id)}>
                      <ConfirmDeleteButton confirmText={`¿Eliminar a ${doctor.nombre} ${doctor.apellido}?`} />
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {doctores.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Aún no hay doctores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
