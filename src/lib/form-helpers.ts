export function emptyToNull(value: FormDataEntryValue | null): string | null {
  const text = typeof value === "string" ? value.trim() : "";
  return text === "" ? null : text;
}

export function toIntOrNull(value: FormDataEntryValue | null): number | null {
  const text = typeof value === "string" ? value.trim() : "";
  if (text === "") return null;
  const parsed = Number.parseInt(text, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function toDecimalOrNull(value: FormDataEntryValue | null): string | null {
  const text = typeof value === "string" ? value.trim() : "";
  if (text === "") return null;
  const parsed = Number.parseFloat(text);
  return Number.isNaN(parsed) ? null : parsed.toFixed(2);
}

export function esTelefonoValido(telefono: string): boolean {
  return /^\+?[0-9]{10,15}$/.test(telefono.replace(/[\s()-]/g, ""));
}

export function esEmailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
