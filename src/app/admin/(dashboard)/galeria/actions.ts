"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { emptyToNull, toIntOrNull } from "@/lib/form-helpers";

function fotoDataFromForm(formData: FormData) {
  const url = String(formData.get("url") ?? "").trim();
  if (!url) {
    throw new Error("La URL de la foto es obligatoria");
  }

  return {
    url,
    titulo: emptyToNull(formData.get("titulo")),
    descripcion: emptyToNull(formData.get("descripcion")),
    categoria: emptyToNull(formData.get("categoria")),
    ordenDisplay: toIntOrNull(formData.get("ordenDisplay")) ?? 0,
    publicado: formData.get("publicado") === "on",
  };
}

export async function crearFoto(formData: FormData) {
  await prisma.galeria.create({ data: fotoDataFromForm(formData) });
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function actualizarFoto(id: number, formData: FormData) {
  await prisma.galeria.update({ where: { id }, data: fotoDataFromForm(formData) });
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function eliminarFoto(id: number) {
  await prisma.galeria.delete({ where: { id } });
  revalidatePath("/admin/galeria");
}
