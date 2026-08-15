"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { emptyToNull, toIntOrNull } from "@/lib/form-helpers";

function casoDataFromForm(formData: FormData) {
  const doctorId = toIntOrNull(formData.get("doctorId"));
  const titulo = String(formData.get("titulo") ?? "").trim();
  const fotoAntesUrl = String(formData.get("fotoAntesUrl") ?? "").trim();
  const fotoDespuesUrl = String(formData.get("fotoDespuesUrl") ?? "").trim();

  if (!doctorId || !titulo || !fotoAntesUrl || !fotoDespuesUrl) {
    throw new Error("Doctor, título y ambas fotos son obligatorios");
  }

  return {
    doctorId,
    titulo,
    tratamiento: emptyToNull(formData.get("tratamiento")),
    descripcion: emptyToNull(formData.get("descripcion")),
    fotoAntesUrl,
    fotoDespuesUrl,
    publicado: formData.get("publicado") === "on",
    ordenDisplay: toIntOrNull(formData.get("ordenDisplay")) ?? 0,
  };
}

export async function crearCasoExito(formData: FormData) {
  await prisma.casoExito.create({ data: casoDataFromForm(formData) });
  revalidatePath("/admin/casos-exito");
  redirect("/admin/casos-exito");
}

export async function actualizarCasoExito(id: number, formData: FormData) {
  await prisma.casoExito.update({ where: { id }, data: casoDataFromForm(formData) });
  revalidatePath("/admin/casos-exito");
  redirect("/admin/casos-exito");
}

export async function eliminarCasoExito(id: number) {
  await prisma.casoExito.delete({ where: { id } });
  revalidatePath("/admin/casos-exito");
}
