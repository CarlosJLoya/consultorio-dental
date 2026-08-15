import { prisma } from "@/lib/prisma";
import { PromocionForm } from "@/components/admin/PromocionForm";
import { crearPromocion } from "../actions";

export default async function NuevaPromocionPage() {
  const paquetes = await prisma.productoPaquete.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Nueva promoción</h1>
      <div className="mt-6">
        <PromocionForm action={crearPromocion} paquetes={paquetes} />
      </div>
    </div>
  );
}
