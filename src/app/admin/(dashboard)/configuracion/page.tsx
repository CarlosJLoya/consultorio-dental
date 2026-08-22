import { prisma } from "@/lib/prisma";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { guardarConfiguracion } from "./actions";

export default async function AdminConfiguracionPage() {
  const registros = await prisma.configuracionSitio.findMany();
  const config = Object.fromEntries(registros.map((r) => [r.clave, r.valor]));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Configuración del sitio</h1>
      <p className="mt-1 text-sm text-muted">
        Nombre, descripción, logo, dirección y WhatsApp que se muestran en el sitio público.
      </p>

      <form action={guardarConfiguracion} className="mt-6 grid max-w-2xl gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUploadField
            name="logo_url"
            label="Logo (modo claro)"
            carpeta="configuracion"
            defaultValue={config.logo_url}
          />
          <ImageUploadField
            name="logo_url_dark"
            label="Logo (modo oscuro)"
            carpeta="configuracion"
            defaultValue={config.logo_url_dark}
          />
        </div>
        <p className="-mt-2 text-xs text-muted">
          Usa solo el ícono/símbolo (sin el nombre escrito), ya que el nombre ya se muestra como texto en el sitio.
        </p>

        <ImageUploadField
          name="foto_hero_url"
          label="Foto del consultorio (portada de inicio)"
          carpeta="configuracion"
          defaultValue={config.foto_hero_url}
        />

        <div>
          <label htmlFor="nombre_empresa" className="text-sm font-medium text-foreground">
            Nombre del consultorio
          </label>
          <input
            id="nombre_empresa"
            name="nombre_empresa"
            type="text"
            defaultValue={config.nombre_empresa ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="descripcion_empresa" className="text-sm font-medium text-foreground">
            Descripción (sección de inicio)
          </label>
          <textarea
            id="descripcion_empresa"
            name="descripcion_empresa"
            rows={4}
            defaultValue={config.descripcion_empresa ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="direccion" className="text-sm font-medium text-foreground">
            Dirección
          </label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            defaultValue={config.direccion ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="telefono_whatsapp_principal" className="text-sm font-medium text-foreground">
            WhatsApp
          </label>
          <input
            id="telefono_whatsapp_principal"
            name="telefono_whatsapp_principal"
            type="text"
            placeholder="521XXXXXXXXXX"
            defaultValue={config.telefono_whatsapp_principal ?? ""}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <p className="mt-1 text-xs text-muted">
            Con código de país, sin espacios ni signos (ej. 526141840207).
          </p>
        </div>

        <button
          type="submit"
          className="mt-2 w-fit rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
