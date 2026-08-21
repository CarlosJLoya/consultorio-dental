import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Foto = {
  titulo: string | null;
  descripcion: string | null;
  url: string;
  categoria: string | null;
  ordenDisplay: number;
  publicado: boolean;
};

const CATEGORIAS = ["instalaciones", "equipo", "recepcion", "consultorio"];

export function GaleriaForm({
  action,
  foto,
}: {
  action: (formData: FormData) => void;
  foto?: Foto;
}) {
  return (
    <form action={action} className="grid max-w-xl gap-4">
      <ImageUploadField name="url" label="Foto" carpeta="galeria" defaultValue={foto?.url} required />

      <div>
        <label htmlFor="titulo" className="text-sm font-medium text-foreground">
          Título (opcional)
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          defaultValue={foto?.titulo ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="text-sm font-medium text-foreground">
          Descripción (opcional)
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          defaultValue={foto?.descripcion ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="categoria" className="text-sm font-medium text-foreground">
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          defaultValue={foto?.categoria ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        >
          <option value="">Sin categoría</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ordenDisplay" className="text-sm font-medium text-foreground">
          Orden de aparición
        </label>
        <input
          id="ordenDisplay"
          name="ordenDisplay"
          type="number"
          defaultValue={foto?.ordenDisplay ?? 0}
          className="mt-1 w-40 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="publicado" defaultChecked={foto?.publicado ?? true} className="rounded border-border" />
        Publicada (visible en el sitio público)
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Guardar
        </button>
        <a href="/admin/galeria" className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:border-primary">
          Cancelar
        </a>
      </div>
    </form>
  );
}
