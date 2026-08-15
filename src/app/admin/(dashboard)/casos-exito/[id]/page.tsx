import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CasoExitoForm } from "@/components/admin/CasoExitoForm";
import { actualizarCasoExito } from "../actions";

export default async function EditarCasoExitoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const casoId = Number(id);

  const [caso, doctores] = await Promise.all([
    prisma.casoExito.findUnique({ where: { id: casoId } }),
    prisma.doctor.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  if (!caso) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Editar caso de éxito</h1>
      <div className="mt-6">
        <CasoExitoForm action={actualizarCasoExito.bind(null, casoId)} doctores={doctores} caso={caso} />
      </div>
    </div>
  );
}
