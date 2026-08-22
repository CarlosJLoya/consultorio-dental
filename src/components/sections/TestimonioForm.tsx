"use client";

import { useActionState, useState } from "react";
import { enviarTestimonio } from "@/app/(public)/actions";

type Doctor = { id: number; nombre: string; apellido: string };

const TIPOS_VIDEO_PERMITIDOS = ["video/mp4", "video/webm", "video/quicktime"];
const TAMANO_MAXIMO_VIDEO_BYTES = 60 * 1024 * 1024; // 60 MB

export function TestimonioForm({ doctores }: { doctores: Doctor[] }) {
  const [estado, formAction, isPending] = useActionState(enviarTestimonio, undefined);
  const [videoUrl, setVideoUrl] = useState("");
  const [subiendoVideo, setSubiendoVideo] = useState(false);
  const [errorVideo, setErrorVideo] = useState<string | null>(null);

  async function subirVideo(file: File) {
    setErrorVideo(null);

    if (!TIPOS_VIDEO_PERMITIDOS.includes(file.type)) {
      setErrorVideo("Solo se permiten videos MP4, WEBM o MOV");
      return;
    }
    if (file.size > TAMANO_MAXIMO_VIDEO_BYTES) {
      setErrorVideo("El video no debe superar 60 MB");
      return;
    }

    setSubiendoVideo(true);
    try {
      const respuestaPresign = await fetch("/api/upload/video-presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type }),
      });
      const { putUrl, publicUrl, error } = await respuestaPresign.json();

      if (!respuestaPresign.ok) {
        setErrorVideo(error ?? "No se pudo preparar la subida del video");
        return;
      }

      const respuestaSubida = await fetch(putUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!respuestaSubida.ok) {
        setErrorVideo("No se pudo subir el video");
        return;
      }

      setVideoUrl(publicUrl);
    } catch {
      setErrorVideo("No se pudo subir el video");
    } finally {
      setSubiendoVideo(false);
    }
  }

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

        <div>
          <label htmlFor="video" className="text-sm font-medium text-foreground">
            Video corto (opcional)
          </label>
          <input type="hidden" name="videoUrl" value={videoUrl} />
          {videoUrl ? (
            <div className="mt-1 flex items-center gap-3">
              <video src={videoUrl} controls className="h-24 w-32 rounded-lg border border-border bg-background" />
              <button
                type="button"
                onClick={() => setVideoUrl("")}
                className="text-xs font-medium text-danger hover:underline"
              >
                Quitar video
              </button>
            </div>
          ) : (
            <input
              id="video"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              disabled={subiendoVideo}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) subirVideo(file);
              }}
              className="mt-1 block w-full text-xs text-muted file:mr-2 file:rounded-lg file:border file:border-border file:bg-surface file:px-2 file:py-1 file:text-xs file:text-foreground"
            />
          )}
          <p className="mt-1 text-xs text-muted">Cuéntanos tu experiencia en video. Máximo 60 MB.</p>
          {subiendoVideo && <p className="mt-1 text-xs text-muted">Subiendo video...</p>}
          {errorVideo && <p className="mt-1 text-xs text-danger">{errorVideo}</p>}
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
