import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { POSTS, postPorSlug } from "@/content/blog";
import { PostContenido } from "@/components/marketing/blog/post-contenido";

/** Pre-renderiza en el build las rutas de todos los artículos publicados. */
export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postPorSlug(slug);

  if (!post) return {};
  return {
    title: `${post.titulo} | Dr. Luis Eduardo Anica Rodríguez`,
    description: post.resumen,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postPorSlug(slug);

  if (!post) notFound();
  return <PostContenido post={post} />;
}
