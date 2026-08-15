import { prisma } from "@/lib/prisma";
import { CasoExitoForm } from "@/components/admin/CasoExitoForm";
import { crearCasoExito } from "../actions";

export default async function NuevoCasoExitoPage() {
  const doctores = await prisma.doctor.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Nuevo caso de éxito</h1>
      <div className="mt-6">
        <CasoExitoForm action={crearCasoExito} doctores={doctores} />
      </div>
    </div>
  );
}
