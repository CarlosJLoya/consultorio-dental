"use client";

import { useActionState, useEffect, useState } from "react";
import { crearCita } from "@/app/(public)/agendar/actions";
import { diasHabilesDisponibles, formatFechaISO, formatHora, HORAS_DISPONIBLES } from "@/lib/citas";

type Doctor = { id: number; nombre: string; apellido: string };
type Especialidad = { id: number; nombre: string; doctores: Doctor[] };

const DIAS = diasHabilesDisponibles();

export function AgendarCitaForm({
  especialidades,
  whatsapp,
}: {
  especialidades: Especialidad[];
  whatsapp: string;
}) {
  const [especialidadId, setEspecialidadId] = useState<number | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [fecha, setFecha] = useState<string>(formatFechaISO(DIAS[0]));
  const [hora, setHora] = useState<number | null>(null);
  const [ocupados, setOcupados] = useState<Set<string>>(new Set());
  const [cargando, setCargando] = useState(false);

  const [estado, formAction, isPending] = useActionState(crearCita, undefined);

  useEffect(() => {
    if (!doctor) return;
    setCargando(true);
    setOcupados(new Set());
    setHora(null);

    fetch(`/api/citas/disponibilidad?doctorId=${doctor.id}`)
      .then((r) => r.json())
      .then((datos) => setOcupados(new Set(datos.ocupados ?? [])))
      .finally(() => setCargando(false));
  }, [doctor]);

  useEffect(() => {
    if (!estado?.success) return;

    const fechaLegible = new Date(`${estado.cita.fecha}T00:00:00Z`).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    const mensaje = encodeURIComponent(
      `Hola, quiero confirmar mi cita:\nDoctor: ${estado.cita.doctorNombre}\nFecha: ${fechaLegible}\nHora: ${formatHora(estado.cita.hora)}\nPaciente: ${estado.cita.nombrePaciente}\nTeléfono: ${estado.cita.telefono}`,
    );

    window.location.href = `https://wa.me/${whatsapp}?text=${mensaje}`;
  }, [estado, whatsapp]);

  if (estado?.success) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <p className="text-lg font-semibold text-foreground">¡Tu solicitud fue registrada!</p>
        <p className="mt-2 text-sm text-muted">Te estamos redirigiendo a WhatsApp para confirmar tu cita...</p>
      </div>
    );
  }

  if (!especialidadId) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {especialidades.map((especialidad) => (
          <button
            key={especialidad.id}
            type="button"
            onClick={() => setEspecialidadId(especialidad.id)}
            className="rounded-xl border border-border bg-surface p-4 text-left font-medium text-foreground hover:border-primary"
          >
            {especialidad.nombre}
          </button>
        ))}
      </div>
    );
  }

  const especialidad = especialidades.find((e) => e.id === especialidadId)!;

  if (!doctor) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setEspecialidadId(null)}
          className="text-sm text-primary hover:underline"
        >
          ← Cambiar especialidad
        </button>
        <p className="mt-3 text-sm font-medium text-foreground">Elige un doctor de {especialidad.nombre}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {especialidad.doctores.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDoctor(d)}
              className="rounded-xl border border-border bg-surface p-4 text-left font-medium text-foreground hover:border-primary"
            >
              {d.nombre} {d.apellido}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid min-w-0 gap-6">
      <input type="hidden" name="doctorId" value={doctor.id} />
      <input type="hidden" name="fecha" value={fecha} />
      <input type="hidden" name="hora" value={hora ?? ""} />

      <div>
        <button
          type="button"
          onClick={() => setDoctor(null)}
          className="text-sm text-primary hover:underline"
        >
          ← Cambiar doctor
        </button>
        <p className="mt-3 text-sm font-medium text-foreground">
          {doctor.nombre} {doctor.apellido} · {especialidad.nombre}
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">Día</p>
        <div className="mt-2 flex w-full gap-2 overflow-x-auto pb-2">
          {DIAS.map((dia) => {
            const valor = formatFechaISO(dia);
            const activo = valor === fecha;
            return (
              <button
                key={valor}
                type="button"
                onClick={() => {
                  setFecha(valor);
                  setHora(null);
                }}
                className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium whitespace-nowrap ${
                  activo
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {dia.toLocaleDateString("es-MX", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  timeZone: "UTC",
                })}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground">Horario</p>
        {cargando ? (
          <p className="mt-2 text-sm text-muted">Consultando disponibilidad...</p>
        ) : (
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {HORAS_DISPONIBLES.map((h) => {
              const ocupado = ocupados.has(`${fecha}-${h}`);
              const activo = hora === h;
              return (
                <button
                  key={h}
                  type="button"
                  disabled={ocupado}
                  onClick={() => setHora(h)}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium ${
                    ocupado
                      ? "cursor-not-allowed border-border bg-surface text-muted line-through"
                      : activo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary"
                  }`}
                >
                  {formatHora(h)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {hora !== null && (
        <>
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

          <div>
            <label htmlFor="telefono" className="text-sm font-medium text-foreground">
              Teléfono de contacto
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="notas" className="text-sm font-medium text-foreground">
              Motivo de la cita (opcional)
            </label>
            <textarea
              id="notas"
              name="notas"
              rows={2}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          {estado && !estado.success && <p className="text-sm text-danger">{estado.message}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
          >
            {isPending ? "Enviando..." : "Solicitar cita"}
          </button>
        </>
      )}
    </form>
  );
}
