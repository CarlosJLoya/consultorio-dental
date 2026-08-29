"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { emptyToNull } from "@/lib/form-helpers";
import { diasHabilesDisponibles, HORA_MIN, HORA_MAX, formatFechaISO } from "@/lib/citas";

export type CitaConfirmada = {
  doctorNombre: string;
  fecha: string;
  hora: number;
  nombrePaciente: string;
  telefono: string;
};

export type EstadoCita = { success: false; message: string } | { success: true; cita: CitaConfirmada };

export async function crearCita(_prevState: EstadoCita | undefined, formData: FormData): Promise<EstadoCita> {
  const doctorId = Number(formData.get("doctorId"));
  const fecha = String(formData.get("fecha") ?? "");
  const hora = Number(formData.get("hora"));
  const nombrePaciente = String(formData.get("nombrePaciente") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const notas = emptyToNull(formData.get("notas"));

  if (!nombrePaciente || !telefono) {
    return { success: false, message: "Nombre y teléfono son obligatorios." };
  }

  if (!Number.isInteger(hora) || hora < HORA_MIN || hora > HORA_MAX) {
    return { success: false, message: "Horario inválido." };
  }

  const diasValidos = new Set(diasHabilesDisponibles().map(formatFechaISO));
  if (!diasValidos.has(fecha)) {
    return { success: false, message: "Fecha inválida." };
  }

  const doctor = await prisma.doctor.findFirst({ where: { id: doctorId, activo: true } });
  if (!doctor) {
    return { success: false, message: "Doctor inválido." };
  }

  try {
    await prisma.cita.create({
      data: {
        doctorId,
        fecha: new Date(`${fecha}T00:00:00Z`),
        hora,
        nombrePaciente,
        telefono,
        notas,
        estado: "pendiente",
      },
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return { success: false, message: "Ese horario ya se acaba de ocupar. Elige otro." };
    }
    throw error;
  }

  revalidatePath("/admin/citas");

  return {
    success: true,
    cita: { doctorNombre: `${doctor.nombre} ${doctor.apellido}`, fecha, hora, nombrePaciente, telefono },
  };
}
