import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductoPaqueteForm } from "@/components/admin/ProductoPaqueteForm";
import { actualizarPaquete } from "../actions";

export default async function EditarPaquetePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paqueteId = Number(id);

  const [paquete, doctores] = await Promise.all([
    prisma.productoPaquete.findUnique({ where: { id: paqueteId } }),
    prisma.doctor.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  if (!paquete) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Editar paquete</h1>
      <div className="mt-6">
        <ProductoPaqueteForm
          action={actualizarPaquete.bind(null, paqueteId)}
          doctores={doctores}
          paquete={{ ...paquete, precio: paquete.precio.toString() }}
        />
      </div>
    </div>
  );
}
