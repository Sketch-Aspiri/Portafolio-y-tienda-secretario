import type { Post } from "@/types/blog";

/**
 * Artículos del blog. BORRADOR: los textos de abajo son marcadores de posición
 * para poder ver y ajustar el diseño; hay que sustituirlos por las
 * publicaciones reales.
 *
 * Se edita aquí —sin tocar componentes— hasta que exista panel de
 * administración. Ordena los artículos del más reciente al más antiguo.
 */

export const POSTS: readonly Post[] = [
  {
    slug: "la-justicia-administrativa-en-quintana-roo",
    titulo: "La justicia administrativa en Quintana Roo",
    fecha: "2026-08-01",
    etiqueta: "Editorial",
    resumen:
      "Reflexión de ejemplo sobre el papel del tribunal contencioso administrativo en el estado.",
    destacado: true,
    contenido: [
      {
        parrafos: [
          "Este es un artículo de ejemplo para mostrar el diseño del blog. Sustitúyelo por el contenido real antes de publicar.",
        ],
      },
      {
        titulo: "Una mirada a la práctica",
        parrafos: [
          "Segunda sección de ejemplo: aquí iría el desarrollo de la idea con el detalle que merezca el tema.",
        ],
      },
    ],
  },
  {
    slug: "responsabilidades-de-los-servidores-publicos",
    titulo: "Responsabilidades de los servidores públicos",
    fecha: "2026-07-15",
    etiqueta: "Responsabilidades",
    resumen:
      "Breve nota de ejemplo sobre faltas graves y no graves en el servicio público.",
    contenido: [
      {
        parrafos: [
          "Artículo de ejemplo sobre el régimen de responsabilidades administrativas de los servidores públicos.",
        ],
      },
    ],
  },
  {
    slug: "procedimiento-administrativo-de-ejecucion",
    titulo: "El procedimiento administrativo de ejecución",
    fecha: "2026-06-20",
    etiqueta: "Materia fiscal",
    resumen:
      "Nota de ejemplo sobre requerimiento, embargo y remate en la ejecución fiscal.",
    contenido: [
      {
        parrafos: [
          "Artículo de ejemplo sobre el procedimiento administrativo de ejecución, paso a paso desde la tesorería.",
        ],
      },
    ],
  },
];

/** Cuántas entradas se asoman en el inicio, debajo de la tienda. */
const MAX_DESTACADOS = 3;

export function postPorSlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

/**
 * Artículos del más reciente al más antiguo, con el marcado como destacado
 * encabezando la lista.
 */
export function postsOrdenados(posts: readonly Post[] = POSTS): Post[] {
  return [...posts].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return b.fecha.localeCompare(a.fecha);
  });
}

/** Las entradas que se muestran en la página de inicio. */
export const POSTS_DESTACADOS: readonly Post[] = postsOrdenados().slice(
  0,
  MAX_DESTACADOS,
);

export function formatearFecha(fecha: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${fecha}T00:00:00`));
}
