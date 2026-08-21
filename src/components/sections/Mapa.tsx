import { getConfiguracion } from "@/lib/config-sitio";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export async function Mapa() {
  const direccion = await getConfiguracion("direccion", "");

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-foreground">Ubicación</h2>
        <p className="mt-2 text-muted">{direccion || "Dirección pendiente de confirmar."}</p>

        {direccion ? (
          <iframe
            title="Mapa de ubicación"
            src={`https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`}
            className="mt-6 h-80 w-full rounded-xl border border-border"
            loading="lazy"
          />
        ) : (
          <PlaceholderImage label="Mapa (dirección pendiente)" className="mt-6 h-80 w-full" />
        )}
      </div>
    </section>
  );
}
