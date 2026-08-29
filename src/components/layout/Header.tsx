import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getConfiguracion } from "@/lib/config-sitio";

const NAV_LINKS = [
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#paquetes", label: "Paquetes" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#casos-exito", label: "Casos de éxito" },
  { href: "/#contacto", label: "Contacto" },
];

export async function Header() {
  const nombreEmpresa = await getConfiguracion("nombre_empresa", "Consultorio Dental");
  const logoUrl = await getConfiguracion("logo_url", "");
  const logoUrlDark = await getConfiguracion("logo_url_dark", "");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Logo size={32} src={logoUrl} srcDark={logoUrlDark} />
          {nombreEmpresa}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/agendar"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover sm:inline-block"
          >
            Agendar cita
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
