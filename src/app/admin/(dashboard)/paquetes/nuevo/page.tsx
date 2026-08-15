import { prisma } from "@/lib/prisma";
import { ProductoPaqueteForm } from "@/components/admin/ProductoPaqueteForm";
import { crearPaquete } from "../actions";

export default async function NuevoPaquetePage() {
  const doctores = await prisma.doctor.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Nuevo paquete</h1>
      <div className="mt-6">
        <ProductoPaqueteForm action={crearPaquete} doctores={doctores} />
      </div>
    </div>
  );
}
