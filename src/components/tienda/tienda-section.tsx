import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PRODUCTOS_DESTACADOS, TIENDA_INTRO } from "@/content/tienda";
import { BloqueTitulo } from "@/components/ui/bloque-titulo";
import { CardSwipe } from "@/components/ui/card-swipe";
import { Reveal } from "@/components/ui/reveal";
import { CategoriasTienda } from "./categorias-tienda";
import { ProductoCard } from "./producto-card";

function Introduccion() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        Tienda
      </p>
      <h2
        id="tienda-titulo"
        className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl"
      >
        Recursos y acompañamiento para la práctica jurídica
      </h2>
      <p className="mt-6 text-base leading-relaxed text-foreground/80">
        {TIENDA_INTRO}
      </p>
    </div>
  );
}

function Destacados() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
      <BloqueTitulo
        align="center"
        titulo="Selección destacada"
        descripcion="Los materiales y servicios más solicitados. El catálogo completo reúne el resto de libros, cursos y modalidades de asesoría."
      />

      <CardSwipe className="mt-12" label="Selección destacada de la tienda">
        {PRODUCTOS_DESTACADOS.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </CardSwipe>

      <Link
        href="/tienda"
        className="mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Ver el catálogo completo
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

export function TiendaSection() {
  return (
    <section
      id="tienda"
      aria-labelledby="tienda-titulo"
      className="w-full scroll-mt-24 border-t border-primary/10 bg-background px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 md:gap-24">
        <Reveal>
          <Introduccion />
        </Reveal>
        <Reveal>
          <CategoriasTienda />
        </Reveal>
        <Reveal>
          <Destacados />
        </Reveal>
      </div>
    </section>
  );
}
