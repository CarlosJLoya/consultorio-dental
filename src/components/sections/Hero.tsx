import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Logo } from "@/components/ui/Logo";
import { getConfiguracion } from "@/lib/config-sitio";

const CDX_LETTERS = ["C", "D", "X"];
const CDX_DELAYS = ["0s", "0.15s", "0.3s"];

export async function Hero() {
  const descripcion = await getConfiguracion(
    "descripcion_empresa",
    "Texto de presentación de la empresa — misión, especialidades y por qué elegirnos. Contenido pendiente de definir.",
  );
  const logoUrl = await getConfiguracion("logo_url", "");
  const logoUrlDark = await getConfiguracion("logo_url_dark", "");
  const fotoHeroUrl = await getConfiguracion("foto_hero_url", "");

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <div className="flex flex-col items-center text-center">
          <Logo size={72} src={logoUrl} srcDark={logoUrlDark} />
          <span className="mt-5 inline-block rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary">
            Nuevos pacientes bienvenidos
          </span>
          <h1 className="mt-5 flex gap-2 text-6xl font-bold tracking-tight text-foreground md:text-7xl">
            {CDX_LETTERS.map((letter, i) => (
              <span key={letter} className="cdx-letter" style={{ animationDelay: CDX_DELAYS[i] }}>
                {letter}
              </span>
            ))}
          </h1>
          <p className="mt-2 text-lg font-bold tracking-wide text-foreground">Cantera Dental Experts</p>
        </div>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{descripcion}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/agendar"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Agendar una cita
          </a>
          <a
            href="/#especialidades"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary"
          >
            Conocer a los doctores
          </a>
        </div>
      </div>

      <PlaceholderImage
        label="Foto del consultorio"
        src={fotoHeroUrl}
        fit="contain"
        className="h-80 w-full bg-surface sm:h-96 md:h-[480px]"
      />
    </section>
  );
}
