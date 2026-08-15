import { prisma } from "@/lib/prisma";
import { DoctorForm } from "@/components/admin/DoctorForm";
import { crearDoctor } from "../actions";

export default async function NuevoDoctorPage() {
  const especialidades = await prisma.especialidad.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Nuevo doctor</h1>
      <div className="mt-6">
        <DoctorForm action={crearDoctor} especialidades={especialidades} />
      </div>
    </div>
  );
}
