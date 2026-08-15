import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GaleriaForm } from "@/components/admin/GaleriaForm";
import { actualizarFoto } from "../actions";

export default async function EditarFotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fotoId = Number(id);

  const foto = await prisma.galeria.findUnique({ where: { id: fotoId } });
  if (!foto) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Editar foto</h1>
      <div className="mt-6">
        <GaleriaForm action={actualizarFoto.bind(null, fotoId)} foto={foto} />
      </div>
    </div>
  );
}
