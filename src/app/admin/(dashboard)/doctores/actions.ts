"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ensureUniqueSlug } from "@/lib/slug";
import { emptyToNull, toIntOrNull } from "@/lib/form-helpers";

function parseEspecialidadIds(formData: FormData) {
  return formData.getAll("especialidades").map((id) => Number(id));
}

function doctorDataFromForm(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const apellido = String(formData.get("apellido") ?? "").trim();

  if (!nombre || !apellido) {
    throw new Error("Nombre y apellido son obligatorios");
  }

  return {
    nombre,
    apellido,
    fotoUrl: emptyToNull(formData.get("fotoUrl")),
    biografiaCorta: emptyToNull(formData.get("biografiaCorta")),
    biografiaLarga: emptyToNull(formData.get("biografiaLarga")),
    cedulaProfesional: emptyToNull(formData.get("cedulaProfesional")),
    aniosExperiencia: toIntOrNull(formData.get("aniosExperiencia")),
    ordenDisplay: toIntOrNull(formData.get("ordenDisplay")) ?? 0,
    activo: formData.get("activo") === "on",
  };
}

export async function crearDoctor(formData: FormData) {
  const data = doctorDataFromForm(formData);
  const especialidadIds = parseEspecialidadIds(formData);

  const slug = await ensureUniqueSlug(`${data.nombre}-${data.apellido}`, async (candidate) => {
    const existente = await prisma.doctor.findUnique({ where: { slug: candidate } });
    return existente !== null;
  });

  await prisma.doctor.create({
    data: {
      ...data,
      slug,
      especialidades: {
        create: especialidadIds.map((especialidadId) => ({ especialidadId })),
      },
    },
  });

  revalidatePath("/admin/doctores");
  redirect("/admin/doctores");
}

export async function actualizarDoctor(id: number, formData: FormData) {
  const data = doctorDataFromForm(formData);
  const especialidadIds = parseEspecialidadIds(formData);

  await prisma.$transaction([
    prisma.doctor.update({ where: { id }, data }),
    prisma.doctorEspecialidad.deleteMany({ where: { doctorId: id } }),
    prisma.doctorEspecialidad.createMany({
      data: especialidadIds.map((especialidadId) => ({ doctorId: id, especialidadId })),
    }),
  ]);

  revalidatePath("/admin/doctores");
  redirect("/admin/doctores");
}

export async function eliminarDoctor(id: number) {
  await prisma.doctor.delete({ where: { id } });
  revalidatePath("/admin/doctores");
}
