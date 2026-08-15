import { auth } from "@/auth";

const SECCIONES_PENDIENTES = [
  "Doctores",
  "Testimonios (moderación)",
  "Casos de éxito",
  "Galería",
  "Paquetes y precios",
  "Promociones",
  "Contactos (leads)",
];

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">
        Hola, {session?.user?.name ?? "administrador"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        Este es el panel base. Las pantallas de administración por sección están pendientes de construir.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECCIONES_PENDIENTES.map((seccion) => (
          <div key={seccion} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-medium text-foreground">{seccion}</p>
            <p className="mt-1 text-xs text-muted">Pendiente de construir</p>
          </div>
        ))}
      </div>
    </div>
  );
}
