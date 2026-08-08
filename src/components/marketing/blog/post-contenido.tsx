import Link from "next/link";

import { formatearFecha } from "@/content/blog";
import type { Post } from "@/types/blog";

interface PostContenidoProps {
  post: Post;
}

/** Encabezado y cuerpo de la página individual de un artículo del blog. */
export function PostContenido({ post }: PostContenidoProps) {
  return (
    <section className="w-full px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          {post.etiqueta}
        </p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {post.titulo}
        </h1>
        <p className="mt-4 text-sm font-medium tracking-widest text-foreground/50 uppercase">
          {formatearFecha(post.fecha)}
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {post.contenido.map((seccion, indice) => (
            <div
              key={`${post.slug}-${seccion.titulo ?? indice}`}
              className="flex flex-col gap-4"
            >
              {seccion.titulo ? (
                <h2 className="font-heading text-2xl font-bold tracking-tight text-primary">
                  {seccion.titulo}
                </h2>
              ) : null}
              {seccion.parrafos.map((parrafo, indiceParrafo) => (
                <p
                  key={`${post.slug}-${indice}-${indiceParrafo}`}
                  className="text-base leading-relaxed text-foreground/80"
                >
                  {parrafo}
                </p>
              ))}
            </div>
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-14 border-t border-primary/10 pt-8 text-xs font-semibold tracking-[0.2em] text-accent uppercase transition-colors hover:text-primary"
        >
          ← Volver al blog
        </Link>
      </div>
    </section>
  );
}
