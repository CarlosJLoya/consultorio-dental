"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function confirmarCita(id: number) {
  await prisma.cita.update({ where: { id }, data: { estado: "confirmada" } });
  revalidatePath("/admin/citas");
}

export async function cancelarCita(id: number) {
  await prisma.cita.update({ where: { id }, data: { estado: "cancelada" } });
  revalidatePath("/admin/citas");
}

export async function eliminarCita(id: number) {
  await prisma.cita.delete({ where: { id } });
  revalidatePath("/admin/citas");
}
