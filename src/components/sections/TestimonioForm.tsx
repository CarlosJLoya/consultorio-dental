"use client";

import { useActionState } from "react";
import { enviarTestimonio } from "@/app/(public)/actions";

type Doctor = { id: number; nombre: string; apellido: string };

export function TestimonioForm({ doctores }: { doctores: Doctor[] }) {
  const [estado, formAction, isPending] = useActionState(enviarTestimonio, undefined);

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-xl border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold text-foreground">Cuéntanos tu experiencia</h3>

      <form action={formAction} className="mt-4 grid gap-4">
        <div>
          <label htmlFor="nombrePaciente" className="text-sm font-medium text-foreground">
            Tu nombre
          </label>
          <input
            id="nombrePaciente"
            name="nombrePaciente"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="calificacion" className="text-sm font-medium text-foreground">
              Calificación
            </label>
            <select
              id="calificacion"
              name="calificacion"
              required
              defaultValue=""
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="" disabled>
                Selecciona
              </option>
              <option value="5">5 - Excelente</option>
              <option value="4">4 - Muy bien</option>
              <option value="3">3 - Bien</option>
              <option value="2">2 - Regular</option>
              <option value="1">1 - Mal</option>
            </select>
          </div>

          {doctores.length > 0 && (
            <div>
              <label htmlFor="doctorId" className="text-sm font-medium text-foreground">
                Doctor (opcional)
              </label>
              <select
                id="doctorId"
                name="doctorId"
                defaultValue=""
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              >
                <option value="">General</option>
                {doctores.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.nombre} {doctor.apellido}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="comentario" className="text-sm font-medium text-foreground">
            Tu comentario
          </label>
          <textarea
            id="comentario"
            name="comentario"
            rows={3}
            required
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        {estado && <p className={`text-sm ${estado.success ? "text-success" : "text-danger"}`}>{estado.message}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {isPending ? "Enviando..." : "Enviar comentario"}
        </button>
      </form>
    </div>
  );
}
