/**
 * Tipos del blog. El contenido vive en `@/content/blog`; aquí solo se describe
 * su forma. Se edita la copia, nunca estos tipos.
 */

/** Una sección del cuerpo del artículo, con su encabezado opcional. */
export interface SeccionPost {
  /** Encabezado (h2) de la sección. Sin él, solo se pintan los párrafos. */
  titulo?: string;
  /** Párrafos del artículo dentro de la sección. */
  parrafos: readonly string[];
}

export interface Post {
  /** Slug estable: será la ruta del artículo (`/blog/<slug>`). */
  slug: string;
  titulo: string;
  /** Fecha en formato ISO, p. ej. "2026-08-01". */
  fecha: string;
  /** Etiqueta corta que identifica el tema en la tarjeta. */
  etiqueta: string;
  /** Texto de la tarjeta en el listado y la descripción de metadatos. */
  resumen: string;
  /** Cuerpo del artículo para la página individual. */
  contenido: readonly SeccionPost[];
  /** Se muestra en primer lugar dentro del listado. */
  destacado?: boolean;
}
