"use client";

import { useActionState, useEffect, useState } from "react";
import { crearCita, type CitaConfirmada } from "@/app/(public)/agendar/actions";
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
  const [vistaConfirmacion, setVistaConfirmacion] = useState(false);

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

  function construirEnlaceWhatsApp(cita: CitaConfirmada) {
    const fechaLegible = new Date(`${cita.fecha}T00:00:00Z`).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    const contacto = [
      cita.telefono ? `Teléfono: ${cita.telefono}` : null,
      cita.email ? `Correo: ${cita.email}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    const mensaje = encodeURIComponent(
      `Hola, quiero confirmar mi cita:\nDoctor: ${cita.doctorNombre}\nFecha: ${fechaLegible}\nHora: ${formatHora(cita.hora)}\nPaciente: ${cita.nombrePaciente}\n${contacto}`,
    );
    return { url: `https://wa.me/${whatsapp}?text=${mensaje}`, fechaLegible };
  }

  useEffect(() => {
    if (!estado?.success) return;
    setVistaConfirmacion(true);
    // Se abre en una pestaña nueva (no se navega fuera del sitio) para que el
    // paciente pueda volver a esta página fácilmente después de enviar el mensaje.
    window.open(construirEnlaceWhatsApp(estado.cita).url, "_blank", "noopener,noreferrer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  if (vistaConfirmacion && estado?.success) {
    const { url, fechaLegible } = construirEnlaceWhatsApp(estado.cita);

    return (
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <p className="text-lg font-semibold text-foreground">¡Tu solicitud fue registrada!</p>
        <p className="mt-2 text-sm text-muted">
          {estado.cita.doctorNombre} · {fechaLegible} · {formatHora(estado.cita.hora)}
        </p>
        <p className="mt-4 text-sm text-muted">Se abrió WhatsApp en una pestaña nueva para confirmar tu cita.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-lg bg-whatsapp px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          ¿No se abrió? Confirmar por WhatsApp
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => {
              setVistaConfirmacion(false);
              setEspecialidadId(null);
              setDoctor(null);
              setHora(null);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Agendar otra cita
          </button>
          <a href="/" className="text-sm font-medium text-primary hover:underline">
            Volver al inicio
          </a>
        </div>
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

          <p className="text-xs text-muted">Déjanos al menos un teléfono o un correo para contactarte.</p>

          <div>
            <label htmlFor="telefono" className="text-sm font-medium text-foreground">
              Teléfono de contacto (opcional)
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              pattern="^\+?[0-9\s()-]{10,17}$"
              title="Ingresa un teléfono válido (10 a 15 dígitos)"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Correo electrónico (opcional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
