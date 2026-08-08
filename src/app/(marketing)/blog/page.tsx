import type { Metadata } from "next";

import { POSTS } from "@/content/blog";
import { BlogLista } from "@/components/marketing/blog/blog-lista";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Blog | Dr. Luis Eduardo Anica Rodríguez",
  description:
    "Publicaciones del Dr. Luis Eduardo Anica Rodríguez sobre justicia administrativa, materia fiscal y el servicio público.",
};

export default function BlogPage() {
  return (
    <section className="w-full px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-20">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Blog
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Publicaciones
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              Notas y artículos sobre la práctica de la justicia administrativa.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <BlogLista posts={POSTS} />
        </Reveal>
      </div>
    </section>
  );
}
