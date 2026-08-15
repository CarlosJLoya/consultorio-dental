"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { emptyToNull, toIntOrNull } from "@/lib/form-helpers";

function promocionDataFromForm(formData: FormData) {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const imagenUrl = String(formData.get("imagenUrl") ?? "").trim();
  const fechaInicioTexto = String(formData.get("fechaInicio") ?? "").trim();
  const fechaFinTexto = String(formData.get("fechaFin") ?? "").trim();

  if (!titulo || !imagenUrl || !fechaInicioTexto || !fechaFinTexto) {
    throw new Error("Título, imagen, fecha de inicio y fecha de fin son obligatorios");
  }

  return {
    titulo,
    imagenUrl,
    descripcion: emptyToNull(formData.get("descripcion")),
    enlaceExterno: emptyToNull(formData.get("enlaceExterno")),
    productoPaqueteId: toIntOrNull(formData.get("productoPaqueteId")),
    fechaInicio: new Date(fechaInicioTexto),
    fechaFin: new Date(fechaFinTexto),
    activo: formData.get("activo") === "on",
    ordenDisplay: toIntOrNull(formData.get("ordenDisplay")) ?? 0,
  };
}

export async function crearPromocion(formData: FormData) {
  await prisma.promocion.create({ data: promocionDataFromForm(formData) });
  revalidatePath("/admin/promociones");
  redirect("/admin/promociones");
}

export async function actualizarPromocion(id: number, formData: FormData) {
  await prisma.promocion.update({ where: { id }, data: promocionDataFromForm(formData) });
  revalidatePath("/admin/promociones");
  redirect("/admin/promociones");
}

export async function eliminarPromocion(id: number) {
  await prisma.promocion.delete({ where: { id } });
  revalidatePath("/admin/promociones");
}
