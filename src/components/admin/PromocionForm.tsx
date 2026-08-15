import { ImageUploadField } from "@/components/admin/ImageUploadField";

type ProductoPaquete = { id: number; nombre: string };

type Promocion = {
  titulo: string;
  descripcion: string | null;
  imagenUrl: string;
  enlaceExterno: string | null;
  productoPaqueteId: number | null;
  fechaInicio: Date;
  fechaFin: Date;
  activo: boolean;
  ordenDisplay: number;
};

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function PromocionForm({
  action,
  paquetes,
  promocion,
}: {
  action: (formData: FormData) => void;
  paquetes: ProductoPaquete[];
  promocion?: Promocion;
}) {
  return (
    <form action={action} className="grid max-w-2xl gap-4">
      <div>
        <label htmlFor="titulo" className="text-sm font-medium text-foreground">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          required
          defaultValue={promocion?.titulo}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="text-sm font-medium text-foreground">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          defaultValue={promocion?.descripcion ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <ImageUploadField name="imagenUrl" label="Banner/imagen" carpeta="promociones" defaultValue={promocion?.imagenUrl} required />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enlaceExterno" className="text-sm font-medium text-foreground">
            Enlace externo (opcional)
          </label>
          <input
            id="enlaceExterno"
            name="enlaceExterno"
            type="text"
            defaultValue={promocion?.enlaceExterno ?? ""}
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="productoPaqueteId" className="text-sm font-medium text-foreground">
            Vincular a un paquete (opcional)
          </label>
          <select
            id="productoPaqueteId"
            name="productoPaqueteId"
            defaultValue={promocion?.productoPaqueteId ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            <option value="">Ninguno</option>
            {paquetes.map((paquete) => (
              <option key={paquete.id} value={paquete.id}>
                {paquete.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fechaInicio" className="text-sm font-medium text-foreground">
            Fecha de inicio
          </label>
          <input
            id="fechaInicio"
            name="fechaInicio"
            type="date"
            required
            defaultValue={promocion ? toDateInputValue(promocion.fechaInicio) : ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="fechaFin" className="text-sm font-medium text-foreground">
            Fecha de fin
          </label>
          <input
            id="fechaFin"
            name="fechaFin"
            type="date"
            required
            defaultValue={promocion ? toDateInputValue(promocion.fechaFin) : ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ordenDisplay" className="text-sm font-medium text-foreground">
          Orden en el carrusel
        </label>
        <input
          id="ordenDisplay"
          name="ordenDisplay"
          type="number"
          defaultValue={promocion?.ordenDisplay ?? 0}
          className="mt-1 w-40 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="activo" defaultChecked={promocion?.activo ?? true} className="rounded border-border" />
        Activa (permite pausarla sin borrarla aunque esté en fecha)
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Guardar
        </button>
        <a href="/admin/promociones" className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:border-primary">
          Cancelar
        </a>
      </div>
    </form>
  );
}
