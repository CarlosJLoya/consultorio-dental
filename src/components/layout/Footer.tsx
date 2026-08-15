import { getConfiguracion } from "@/lib/config-sitio";

export async function Footer() {
  const nombreEmpresa = await getConfiguracion("nombre_empresa", "Consultorio Dental");

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
        <div>
          <p className="text-lg font-bold text-foreground">{nombreEmpresa}</p>
          <p className="mt-2 text-sm text-muted">
            Dirección y horario de atención — pendiente de confirmar.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Contacto</p>
          <p className="mt-2 text-sm text-muted">Teléfono / WhatsApp — pendiente</p>
          <p className="text-sm text-muted">correo@consultorio.mx</p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {nombreEmpresa}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
