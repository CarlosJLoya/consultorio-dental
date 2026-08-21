"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { emptyToNull } from "@/lib/form-helpers";

const CAMPOS = [
  "nombre_empresa",
  "descripcion_empresa",
  "direccion",
  "telefono_whatsapp_principal",
  "logo_url",
  "foto_hero_url",
] as const;

export async function guardarConfiguracion(formData: FormData) {
  await Promise.all(
    CAMPOS.map((clave) => {
      const valor = emptyToNull(formData.get(clave));
      if (valor === null) {
        return prisma.configuracionSitio.deleteMany({ where: { clave } });
      }
      return prisma.configuracionSitio.upsert({
        where: { clave },
        update: { valor },
        create: { clave, valor },
      });
    }),
  );

  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracion");
}
