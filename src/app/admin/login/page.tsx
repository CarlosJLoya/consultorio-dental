"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [error, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form action={formAction} className="w-full max-w-sm rounded-xl border border-border bg-surface p-6">
        <h1 className="text-xl font-bold text-foreground">Panel de administración</h1>
        <p className="mt-1 text-sm text-muted">Consultorio Dental</p>

        <div className="mt-6">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        {error && <p className="mt-4 text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {isPending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
