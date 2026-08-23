import { Hero } from "@/components/sections/Hero";
import { PromocionesBanner } from "@/components/sections/PromocionesBanner";
import { NuestroConsultorio } from "@/components/sections/NuestroConsultorio";
import { Especialidades } from "@/components/sections/Especialidades";
import { ProductosPaquetes } from "@/components/sections/ProductosPaquetes";
import { CasosExito } from "@/components/sections/CasosExito";
import { RankingTestimonios } from "@/components/sections/RankingTestimonios";
import { Mapa } from "@/components/sections/Mapa";
import { Contacto } from "@/components/sections/Contacto";
import { RedesSociales } from "@/components/sections/RedesSociales";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromocionesBanner />
      <NuestroConsultorio />
      <Especialidades />
      <ProductosPaquetes />
      <CasosExito />
      <RankingTestimonios />
      <Mapa />
      <Contacto />
      <RedesSociales />
    </>
  );
}
