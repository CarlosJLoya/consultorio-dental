import Link from "next/link";
import { signOut } from "@/auth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const ADMIN_NAV = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/configuracion", label: "Configuración" },
  { href: "/admin/doctores", label: "Doctores" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/casos-exito", label: "Casos de éxito" },
  { href: "/admin/galeria", label: "Galería" },
  { href: "/admin/paquetes", label: "Paquetes" },
  { href: "/admin/promociones", label: "Promociones" },
  { href: "/admin/contactos", label: "Contactos" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-surface p-4 md:block">
        <p className="mb-6 text-sm font-bold text-foreground">Panel admin</p>
        <nav className="flex flex-col gap-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-background hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b border-border px-4">
          <p className="text-sm text-muted md:hidden">Panel admin</p>
          <div />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button type="submit" className="text-sm text-muted hover:text-primary">
                Cerrar sesión
              </button>
            </form>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
