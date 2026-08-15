"use client";

import { useActionState } from "react";
import { enviarContacto } from "@/app/(public)/actions";

export function Contacto() {
  const [estado, formAction, isPending] = useActionState(enviarContacto, undefined);

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground">Contacto</h2>
      <p className="mt-2 text-muted">Déjanos tus datos y te contactamos a la brevedad.</p>

      <form action={formAction} className="mt-8 grid max-w-xl gap-4">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="Tu teléfono"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Correo (opcional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="tu@correo.com"
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        {estado && (
          <p className={`text-sm ${estado.success ? "text-success" : "text-danger"}`}>{estado.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {isPending ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
}
