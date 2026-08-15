import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PromocionForm } from "@/components/admin/PromocionForm";
import { actualizarPromocion } from "../actions";

export default async function EditarPromocionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const promocionId = Number(id);

  const [promocion, paquetes] = await Promise.all([
    prisma.promocion.findUnique({ where: { id: promocionId } }),
    prisma.productoPaquete.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  if (!promocion) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Editar promoción</h1>
      <div className="mt-6">
        <PromocionForm action={actualizarPromocion.bind(null, promocionId)} paquetes={paquetes} promocion={promocion} />
      </div>
    </div>
  );
}
