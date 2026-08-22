"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { emptyToNull, toIntOrNull } from "@/lib/form-helpers";

export type EstadoFormulario = { success: boolean; message: string };

export async function enviarContacto(
  _prevState: EstadoFormulario | undefined,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();

  if (!nombre || !telefono) {
    return { success: false, message: "Nombre y teléfono son obligatorios." };
  }

  await prisma.contacto.create({
    data: {
      nombre,
      telefono,
      email: emptyToNull(formData.get("email")),
      mensaje: emptyToNull(formData.get("mensaje")),
      medioContacto: "formulario_web",
      estado: "nuevo",
    },
  });

  revalidatePath("/admin/contactos");
  return { success: true, message: "¡Gracias! Te contactaremos pronto." };
}

export async function enviarTestimonio(
  _prevState: EstadoFormulario | undefined,
  formData: FormData,
): Promise<EstadoFormulario> {
  const nombrePaciente = String(formData.get("nombrePaciente") ?? "").trim();
  const comentario = String(formData.get("comentario") ?? "").trim();
  const calificacion = toIntOrNull(formData.get("calificacion"));

  if (!nombrePaciente || !comentario || !calificacion || calificacion < 1 || calificacion > 5) {
    return { success: false, message: "Nombre, calificación y comentario son obligatorios." };
  }

  await prisma.testimonio.create({
    data: {
      nombrePaciente,
      comentario,
      calificacion,
      doctorId: toIntOrNull(formData.get("doctorId")),
      videoUrl: emptyToNull(formData.get("videoUrl")),
      estado: "pendiente",
      origen: "formulario_publico",
    },
  });

  revalidatePath("/admin/testimonios");
  return { success: true, message: "Tu comentario se publicará pronto." };
}
