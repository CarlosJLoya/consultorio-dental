"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

async function cambiarEstado(id: number, estado: "nuevo" | "contactado" | "cerrado") {
  await prisma.contacto.update({ where: { id }, data: { estado } });
  revalidatePath("/admin/contactos");
}

export async function marcarContactado(id: number) {
  await cambiarEstado(id, "contactado");
}

export async function marcarCerrado(id: number) {
  await cambiarEstado(id, "cerrado");
}

export async function reabrirContacto(id: number) {
  await cambiarEstado(id, "nuevo");
}

export async function eliminarContacto(id: number) {
  await prisma.contacto.delete({ where: { id } });
  revalidatePath("/admin/contactos");
}
