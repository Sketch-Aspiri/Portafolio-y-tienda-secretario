import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { POSTS_DESTACADOS } from "@/content/blog";
import { CardSwipe } from "@/components/ui/card-swipe";
import { Reveal } from "@/components/ui/reveal";
import { PostCard } from "./post-card";

function Introduccion() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        Blog
      </p>
      <h2
        id="blog-titulo"
        className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl"
      >
        Entradas destacadas
      </h2>
      <p className="mt-6 text-base leading-relaxed text-foreground/80">
        Notas y artículos sobre la práctica de la justicia administrativa, la
        materia fiscal y el servicio público.
      </p>
    </div>
  );
}

/**
 * Asomo del blog en la página de inicio: las últimas entradas, con el enlace
 * al listado completo.
 */
export function BlogSection() {
  if (POSTS_DESTACADOS.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-titulo"
      className="w-full scroll-mt-24 border-t border-primary/10 bg-background px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-20">
        <Reveal>
          <Introduccion />
        </Reveal>

        <Reveal>
          <div className="flex w-full flex-col items-center">
            <CardSwipe label="Entradas destacadas del blog">
              {POSTS_DESTACADOS.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </CardSwipe>

            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Ver todas las publicaciones
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
