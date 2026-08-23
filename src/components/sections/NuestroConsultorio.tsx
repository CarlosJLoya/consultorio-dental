import { prisma } from "@/lib/prisma";
import { CategoriaCarrusel } from "@/components/ui/CategoriaCarrusel";

const SECCIONES = [
  { categoria: "instalaciones", titulo: "Instalaciones" },
  { categoria: "consultorios", titulo: "Consultorios" },
  { categoria: "equipos", titulo: "Equipos" },
];

export async function NuestroConsultorio() {
  const fotos = await prisma.galeria.findMany({
    where: { publicado: true, categoria: { in: SECCIONES.map((s) => s.categoria) } },
    orderBy: { ordenDisplay: "asc" },
  });

  const secciones = SECCIONES.map((seccion) => ({
    ...seccion,
    fotos: fotos.filter((foto) => foto.categoria === seccion.categoria),
  })).filter((seccion) => seccion.fotos.length > 0);

  if (secciones.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold text-foreground">Conoce nuestro consultorio</h2>

      <div className="mt-10 flex flex-col gap-16">
        {secciones.map((seccion, index) => (
          <div key={seccion.categoria}>
            <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">{seccion.titulo}</h3>
            <div className="mt-4">
              <CategoriaCarrusel fotos={seccion.fotos} invertido={index % 2 === 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
