import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Estrellas } from "@/components/ui/Estrellas";

export const revalidate = 60;

export default async function DoctorDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const doctor = await prisma.doctor.findFirst({
    where: { slug, activo: true },
    include: {
      especialidades: { include: { especialidad: true } },
      redesSociales: true,
      testimonios: { where: { estado: "aprobado" }, orderBy: { createdAt: "desc" } },
      casosExito: { where: { publicado: true }, orderBy: { ordenDisplay: "asc" } },
    },
  });

  if (!doctor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="grid gap-8 sm:grid-cols-[240px_1fr]">
        <PlaceholderImage label="Foto doctor" src={doctor.fotoUrl} className="aspect-square w-full" />

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {doctor.nombre} {doctor.apellido}
          </h1>

          <div className="mt-2 flex flex-wrap gap-2">
            {doctor.especialidades.map(({ especialidad }) => (
              <span key={especialidad.id} className="rounded-full bg-surface px-3 py-1 text-xs text-primary">
                {especialidad.nombre}
              </span>
            ))}
          </div>

          {doctor.biografiaCorta && <p className="mt-4 text-base text-foreground">{doctor.biografiaCorta}</p>}

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {doctor.aniosExperiencia !== null && (
              <div>
                <dt className="text-muted">Años de experiencia</dt>
                <dd className="text-foreground">{doctor.aniosExperiencia}</dd>
              </div>
            )}
            {doctor.cedulaProfesional && (
              <div>
                <dt className="text-muted">Cédula profesional</dt>
                <dd className="text-foreground">{doctor.cedulaProfesional}</dd>
              </div>
            )}
          </dl>

          {doctor.redesSociales.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {doctor.redesSociales.map((red) => (
                <a key={red.id} href={red.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  {red.plataforma}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {doctor.biografiaLarga && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Sobre el doctor</h2>
          <p className="mt-2 whitespace-pre-line text-sm text-foreground">{doctor.biografiaLarga}</p>
        </div>
      )}

      {doctor.casosExito.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Casos de éxito</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {doctor.casosExito.map((caso) => (
              <div key={caso.id} className="rounded-xl border border-border bg-surface p-4">
                <p className="mb-3 font-medium text-foreground">{caso.titulo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <PlaceholderImage label="Antes" src={caso.fotoAntesUrl} className="aspect-square w-full" />
                  <PlaceholderImage label="Después" src={caso.fotoDespuesUrl} className="aspect-square w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {doctor.testimonios.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground">Testimonios de pacientes</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {doctor.testimonios.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-surface p-4">
                <Estrellas calificacion={t.calificacion} />
                <p className="mt-2 text-sm text-foreground">"{t.comentario}"</p>
                <p className="mt-2 text-xs text-muted">{t.nombrePaciente}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
