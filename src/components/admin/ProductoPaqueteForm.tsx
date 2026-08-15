import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Doctor = { id: number; nombre: string; apellido: string };

type ProductoPaquete = {
  nombre: string;
  precio: string;
  descripcion: string | null;
  doctorId: number | null;
  categoria: string | null;
  imagenUrl: string | null;
  destacado: boolean;
  activo: boolean;
  ordenDisplay: number;
};

export function ProductoPaqueteForm({
  action,
  doctores,
  paquete,
}: {
  action: (formData: FormData) => void;
  doctores: Doctor[];
  paquete?: ProductoPaquete;
}) {
  return (
    <form action={action} className="grid max-w-2xl gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            defaultValue={paquete?.nombre}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="precio" className="text-sm font-medium text-foreground">
            Precio (MXN)
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={paquete?.precio}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="descripcion" className="text-sm font-medium text-foreground">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          defaultValue={paquete?.descripcion ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="doctorId" className="text-sm font-medium text-foreground">
            Doctor (opcional)
          </label>
          <select
            id="doctorId"
            name="doctorId"
            defaultValue={paquete?.doctorId ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            <option value="">General (ningún doctor específico)</option>
            {doctores.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.nombre} {doctor.apellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoria" className="text-sm font-medium text-foreground">
            Categoría
          </label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            defaultValue={paquete?.categoria ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <ImageUploadField name="imagenUrl" label="Imagen" carpeta="paquetes" defaultValue={paquete?.imagenUrl} />

      <div>
        <label htmlFor="ordenDisplay" className="text-sm font-medium text-foreground">
          Orden de aparición
        </label>
        <input
          id="ordenDisplay"
          name="ordenDisplay"
          type="number"
          defaultValue={paquete?.ordenDisplay ?? 0}
          className="mt-1 w-40 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="activo" defaultChecked={paquete?.activo ?? true} className="rounded border-border" />
          Activo
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="destacado" defaultChecked={paquete?.destacado ?? false} className="rounded border-border" />
          Destacado
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Guardar
        </button>
        <a href="/admin/paquetes" className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:border-primary">
          Cancelar
        </a>
      </div>
    </form>
  );
}
