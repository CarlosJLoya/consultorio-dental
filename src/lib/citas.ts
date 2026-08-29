export const HORA_MIN = 9;
export const HORA_MAX = 16; // último horario que se puede agendar (termina 17:00)
export const HORIZONTE_DIAS = 28;

export const HORAS_DISPONIBLES = Array.from(
  { length: HORA_MAX - HORA_MIN + 1 },
  (_, i) => HORA_MIN + i,
);

// Los días de calendario se representan siempre como medianoche UTC (sin hora),
// igual que como MySQL/Prisma los guarda y los regresa en la columna `@db.Date`.
// Usar getFullYear/getMonth/getDate (locales) en vez de sus versiones UTC aquí
// desfasaría la fecha un día en zonas horarias con offset negativo (ver bug real
// encontrado: 31 de agosto se guardaba y regresaba como 30 de agosto).

export function formatFechaISO(fecha: Date): string {
  const anio = fecha.getUTCFullYear();
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getUTCDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export function esDiaHabil(fecha: Date): boolean {
  const dia = fecha.getUTCDay();
  return dia >= 1 && dia <= 5;
}

export function diasHabilesDisponibles(): Date[] {
  const dias: Date[] = [];
  const ahora = new Date();
  const hoy = new Date(Date.UTC(ahora.getFullYear(), ahora.getMonth(), ahora.getDate()));

  for (let offset = 0; dias.length < HORIZONTE_DIAS; offset++) {
    const candidato = new Date(hoy);
    candidato.setUTCDate(hoy.getUTCDate() + offset);
    if (esDiaHabil(candidato)) {
      dias.push(candidato);
    }
  }

  return dias;
}

export function formatHora(hora: number): string {
  const periodo = hora < 12 ? "a.m." : "p.m.";
  const hora12 = hora <= 12 ? hora : hora - 12;
  return `${hora12}:00 ${periodo}`;
}
