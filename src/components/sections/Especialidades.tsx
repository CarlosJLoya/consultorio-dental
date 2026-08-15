import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export async function Especialidades() {
  const especialidades = await prisma.especialidad.findMany({
    include: {
      doctores: {
        where: { doctor: { activo: true } },
        include: { doctor: true },
      },
    },
    orderBy: { nombre: "asc" },
  });

  const especialidadesConDoctores = especialidades.filter((e) => e.doctores.length > 0);

  if (especialidadesConDoctores.length === 0) {
    return null;
  }

  return (
    <section id="especialidades" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground">Nuestras especialidades</h2>
      <p className="mt-2 text-muted">Elige una especialidad para conocer al doctor a cargo.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {especialidadesConDoctores.map((especialidad) => (
          <div key={especialidad.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold text-foreground">{especialidad.nombre}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {especialidad.doctores.map(({ doctor }) => (
                <Link
                  key={doctor.id}
                  href={`/doctores/${doctor.slug}`}
                  aria-label={`Ver perfil del doctor de ${especialidad.nombre}`}
                  className="block h-16 w-16 overflow-hidden rounded-full border border-border transition-transform hover:scale-105"
                >
                  <PlaceholderImage label="" src={doctor.fotoUrl} className="h-full w-full rounded-full" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
