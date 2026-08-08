import { postsOrdenados } from "@/content/blog";
import type { Post } from "@/types/blog";
import { cn } from "@/lib/utils";
import { PostCard } from "./post-card";

interface BlogListaProps {
  posts: readonly Post[];
  className?: string;
}

/**
 * Cuadrícula de artículos del blog, del más reciente al más antiguo.
 * El artículo marcado como destacado encabeza la lista.
 */
export function BlogLista({ posts, className }: BlogListaProps) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {postsOrdenados(posts).map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
