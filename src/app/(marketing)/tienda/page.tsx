import type { Metadata } from "next";

import { TIENDA_INTRO } from "@/content/tienda";
import { CatalogoCompleto } from "@/components/tienda/catalogo-completo";
import { CategoriasTienda } from "@/components/tienda/categorias-tienda";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Tienda | Dr. Luis Eduardo Anica Rodríguez",
  description:
    "Libros y manuales en PDF, cursos en video, comunidad de actualización jurídica y asesorías especializadas en materia fiscal y administrativa.",
};

export default function TiendaPage() {
  return (
    <section className="w-full px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 md:gap-24">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Tienda
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Catálogo
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              {TIENDA_INTRO}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <CategoriasTienda />
        </Reveal>

        <CatalogoCompleto />
      </div>
    </section>
  );
}
