"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ensureUniqueSlug } from "@/lib/slug";
import { emptyToNull, toIntOrNull, toDecimalOrNull } from "@/lib/form-helpers";

function paqueteDataFromForm(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const precio = toDecimalOrNull(formData.get("precio"));

  if (!nombre || !precio) {
    throw new Error("Nombre y precio son obligatorios");
  }

  return {
    nombre,
    precio,
    descripcion: emptyToNull(formData.get("descripcion")),
    doctorId: toIntOrNull(formData.get("doctorId")),
    categoria: emptyToNull(formData.get("categoria")),
    imagenUrl: emptyToNull(formData.get("imagenUrl")),
    destacado: formData.get("destacado") === "on",
    activo: formData.get("activo") === "on",
    ordenDisplay: toIntOrNull(formData.get("ordenDisplay")) ?? 0,
  };
}

export async function crearPaquete(formData: FormData) {
  const data = paqueteDataFromForm(formData);
  const slug = await ensureUniqueSlug(data.nombre, async (candidate) => {
    const existente = await prisma.productoPaquete.findUnique({ where: { slug: candidate } });
    return existente !== null;
  });

  await prisma.productoPaquete.create({ data: { ...data, slug } });
  revalidatePath("/admin/paquetes");
  redirect("/admin/paquetes");
}

export async function actualizarPaquete(id: number, formData: FormData) {
  await prisma.productoPaquete.update({ where: { id }, data: paqueteDataFromForm(formData) });
  revalidatePath("/admin/paquetes");
  redirect("/admin/paquetes");
}

export async function eliminarPaquete(id: number) {
  await prisma.productoPaquete.delete({ where: { id } });
  revalidatePath("/admin/paquetes");
}
