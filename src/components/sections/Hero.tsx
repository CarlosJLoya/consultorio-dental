import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Logo } from "@/components/ui/Logo";
import { getConfiguracion } from "@/lib/config-sitio";

export async function Hero() {
  const nombreEmpresa = await getConfiguracion("nombre_empresa", "Consultorio Dental");
  const descripcion = await getConfiguracion(
    "descripcion_empresa",
    "Texto de presentación de la empresa — misión, especialidades y por qué elegirnos. Contenido pendiente de definir.",
  );

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <Logo size={56} />
        <span className="mt-4 inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary">
          Nuevos pacientes bienvenidos
        </span>
        <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">
          Sonríe con confianza en {nombreEmpresa}
        </h1>
        <p className="mt-4 text-base text-muted">{descripcion}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contacto"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Agendar una cita
          </a>
          <a
            href="#especialidades"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
          >
            Conocer a los doctores
          </a>
        </div>
      </div>

      <PlaceholderImage label="Foto del consultorio" className="aspect-[4/3] w-full" />
    </section>
  );
}
