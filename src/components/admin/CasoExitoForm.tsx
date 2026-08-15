import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Doctor = { id: number; nombre: string; apellido: string };

type CasoExito = {
  doctorId: number;
  titulo: string;
  tratamiento: string | null;
  descripcion: string | null;
  fotoAntesUrl: string;
  fotoDespuesUrl: string;
  publicado: boolean;
  ordenDisplay: number;
};

export function CasoExitoForm({
  action,
  doctores,
  caso,
}: {
  action: (formData: FormData) => void;
  doctores: Doctor[];
  caso?: CasoExito;
}) {
  return (
    <form action={action} className="grid max-w-2xl gap-4">
      <div>
        <label htmlFor="doctorId" className="text-sm font-medium text-foreground">
          Doctor
        </label>
        <select
          id="doctorId"
          name="doctorId"
          required
          defaultValue={caso?.doctorId}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        >
          <option value="">Selecciona un doctor</option>
          {doctores.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.nombre} {doctor.apellido}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="titulo" className="text-sm font-medium text-foreground">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          required
          defaultValue={caso?.titulo}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="tratamiento" className="text-sm font-medium text-foreground">
          Tratamiento
        </label>
        <input
          id="tratamiento"
          name="tratamiento"
          type="text"
          defaultValue={caso?.tratamiento ?? ""}
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
          defaultValue={caso?.descripcion ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadField name="fotoAntesUrl" label={'Foto "antes"'} carpeta="casos-exito" defaultValue={caso?.fotoAntesUrl} required />
        <ImageUploadField name="fotoDespuesUrl" label={'Foto "después"'} carpeta="casos-exito" defaultValue={caso?.fotoDespuesUrl} required />
      </div>

      <div>
        <label htmlFor="ordenDisplay" className="text-sm font-medium text-foreground">
          Orden de aparición
        </label>
        <input
          id="ordenDisplay"
          name="ordenDisplay"
          type="number"
          defaultValue={caso?.ordenDisplay ?? 0}
          className="mt-1 w-40 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="publicado" defaultChecked={caso?.publicado ?? false} className="rounded border-border" />
        Publicado (visible en el sitio público)
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Guardar
        </button>
        <a href="/admin/casos-exito" className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:border-primary">
          Cancelar
        </a>
      </div>
    </form>
  );
}
