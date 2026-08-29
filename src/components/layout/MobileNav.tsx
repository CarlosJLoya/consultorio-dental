"use client";

import { useState } from "react";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-surface"
      >
        {abierto ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {abierto && (
        <nav className="absolute inset-x-0 top-16 z-40 flex flex-col gap-1 border-b border-border bg-background px-4 py-4 shadow-lg">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setAbierto(false)}
              className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/agendar"
            onClick={() => setAbierto(false)}
            className="mt-2 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Agendar cita
          </a>
        </nav>
      )}
    </div>
  );
}
