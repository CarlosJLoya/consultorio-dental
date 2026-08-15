type Especialidad = { id: number; nombre: string };

type DoctorConEspecialidades = {
  nombre: string;
  apellido: string;
  fotoUrl: string | null;
  biografiaCorta: string | null;
  biografiaLarga: string | null;
  cedulaProfesional: string | null;
  aniosExperiencia: number | null;
  ordenDisplay: number;
  activo: boolean;
  especialidades: { especialidadId: number }[];
};

export function DoctorForm({
  action,
  especialidades,
  doctor,
}: {
  action: (formData: FormData) => void;
  especialidades: Especialidad[];
  doctor?: DoctorConEspecialidades;
}) {
  const especialidadIdsSeleccionadas = new Set(doctor?.especialidades.map((e) => e.especialidadId) ?? []);

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
            defaultValue={doctor?.nombre}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="apellido" className="text-sm font-medium text-foreground">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            required
            defaultValue={doctor?.apellido}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="fotoUrl" className="text-sm font-medium text-foreground">
          URL de la foto
        </label>
        <input
          id="fotoUrl"
          name="fotoUrl"
          type="text"
          defaultValue={doctor?.fotoUrl ?? ""}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="biografiaCorta" className="text-sm font-medium text-foreground">
          Biografía corta
        </label>
        <textarea
          id="biografiaCorta"
          name="biografiaCorta"
          rows={2}
          defaultValue={doctor?.biografiaCorta ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="biografiaLarga" className="text-sm font-medium text-foreground">
          Biografía completa
        </label>
        <textarea
          id="biografiaLarga"
          name="biografiaLarga"
          rows={4}
          defaultValue={doctor?.biografiaLarga ?? ""}
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="cedulaProfesional" className="text-sm font-medium text-foreground">
            Cédula profesional
          </label>
          <input
            id="cedulaProfesional"
            name="cedulaProfesional"
            type="text"
            defaultValue={doctor?.cedulaProfesional ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="aniosExperiencia" className="text-sm font-medium text-foreground">
            Años de experiencia
          </label>
          <input
            id="aniosExperiencia"
            name="aniosExperiencia"
            type="number"
            min={0}
            defaultValue={doctor?.aniosExperiencia ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="ordenDisplay" className="text-sm font-medium text-foreground">
            Orden de aparición
          </label>
          <input
            id="ordenDisplay"
            name="ordenDisplay"
            type="number"
            defaultValue={doctor?.ordenDisplay ?? 0}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">Especialidades</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {especialidades.map((especialidad) => (
            <label key={especialidad.id} className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                name="especialidades"
                value={especialidad.id}
                defaultChecked={especialidadIdsSeleccionadas.has(especialidad.id)}
                className="rounded border-border"
              />
              {especialidad.nombre}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" name="activo" defaultChecked={doctor?.activo ?? true} className="rounded border-border" />
        Activo (visible en el sitio público)
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Guardar
        </button>
        <a href="/admin/doctores" className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:border-primary">
          Cancelar
        </a>
      </div>
    </form>
  );
}
