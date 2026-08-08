import Link from "next/link";

import { formatearFecha } from "@/content/blog";
import type { Post } from "@/types/blog";
import { ExpandableProfileCard } from "@/components/ui/expandable-profile-card";

interface PostCardProps {
  post: Post;
}

/**
 * Tarjeta de un artículo en el listado del blog. Al abrirla despliega una
 * previsualización —igual que las fichas de la tienda— y desde ahí se entra al
 * artículo completo en `/blog/<slug>`.
 */
export function PostCard({ post }: PostCardProps) {
  const avance = post.contenido[0]?.parrafos[0];

  return (
    <ExpandableProfileCard
      id={post.slug}
      title={post.titulo}
      subtitle={post.etiqueta}
      badge={formatearFecha(post.fecha)}
    >
      <div className="flex h-full flex-col gap-6">
        <p>{post.resumen}</p>

        {avance ? (
          <div>
            <h4 className="font-semibold tracking-tight text-primary">
              Avance
            </h4>
            <p className="mt-2 line-clamp-6 text-foreground/60">{avance}</p>
          </div>
        ) : null}

        <div className="mt-auto border-t border-primary/10 pt-5">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Ver más
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </ExpandableProfileCard>
  );
}
