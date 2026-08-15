export function estaVigente(
  promocion: { activo: boolean; fechaInicio: Date; fechaFin: Date },
  ahora: Date,
): boolean {
  const finDelDia = new Date(promocion.fechaFin);
  finDelDia.setUTCHours(23, 59, 59, 999);

  return promocion.activo && promocion.fechaInicio <= ahora && ahora <= finDelDia;
}
