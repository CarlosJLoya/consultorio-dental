"use client";

import { useId, useState } from "react";

type Carpeta = "doctores" | "galeria" | "casos-exito" | "paquetes" | "promociones" | "configuracion";

export function ImageUploadField({
  name,
  label,
  carpeta,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  carpeta: Carpeta;
  defaultValue?: string | null;
  required?: boolean;
}) {
  const inputId = useId();
  const [url, setUrl] = useState(defaultValue ?? "");
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function subirArchivo(file: File) {
    setSubiendo(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("carpeta", carpeta);

      const respuesta = await fetch("/api/upload", { method: "POST", body: formData });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error ?? "No se pudo subir la imagen");
        return;
      }

      setUrl(datos.url);
    } catch {
      setError("No se pudo subir la imagen");
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="mt-1 flex items-center gap-3">
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-14 w-14 rounded-lg border border-border object-cover" />
        )}

        <div className="flex-1">
          <input
            id={inputId}
            name={name}
            type="text"
            required={required}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://... o sube un archivo"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={subiendo}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) subirArchivo(file);
            }}
            className="mt-1 block text-xs text-muted file:mr-2 file:rounded-lg file:border file:border-border file:bg-surface file:px-2 file:py-1 file:text-xs file:text-foreground"
          />
          {subiendo && <p className="mt-1 text-xs text-muted">Subiendo...</p>}
          {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}
