import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Mapa() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-foreground">Ubicación</h2>
        <p className="mt-2 text-muted">
          Dirección y mapa pendientes de confirmar. Se incrustará Google Maps con la dirección real.
        </p>
        <PlaceholderImage label="Mapa (Google Maps embed pendiente)" className="mt-6 h-80 w-full" />
      </div>
    </section>
  );
}
