import type { CategoriaId, CategoriaTienda, Producto } from "@/types/tienda";

/**
 * Catálogo de la tienda. BORRADOR: los productos y precios de abajo son
 * marcadores de posición para poder ver y ajustar el diseño; hay que
 * sustituirlos por el catálogo real antes de conectar Stripe.
 *
 * Se edita aquí —sin tocar componentes— hasta que exista panel de administración.
 */

export const TIENDA_INTRO =
  "Material de consulta, formación y acompañamiento profesional elaborados desde la práctica en la justicia administrativa: manuales y guías descargables, cursos en video, una comunidad de actualización permanente y asesoría directa para casos concretos.";

export const CATEGORIAS: readonly CategoriaTienda[] = [
  {
    id: "libros",
    nombre: "Libros y manuales",
    descripcion:
      "Obras y guías en PDF sobre procedimiento administrativo, materia fiscal y responsabilidades.",
  },
  {
    id: "cursos",
    nombre: "Cursos y videos",
    descripcion:
      "Programas grabados, con material descargable y acceso permanente desde su biblioteca.",
  },
  {
    id: "comunidad",
    nombre: "Comunidad",
    descripcion:
      "Grupo de WhatsApp con criterios recientes, avisos normativos y resolución de dudas.",
  },
  {
    id: "asesorias",
    nombre: "Asesorías y consultoría",
    descripcion:
      "Sesiones individuales, dictámenes y evaluaciones para asuntos y proyectos específicos.",
  },
];

export const PRODUCTOS: readonly Producto[] = [
  {
    id: "manual-procedimiento-administrativo",
    categoria: "libros",
    titulo: "Manual del procedimiento contencioso administrativo",
    resumen:
      "Guía práctica del juicio de nulidad ante el tribunal, de la demanda a la sentencia, con formatos y criterios aplicables.",
    precioCentavos: 45_000,
    cobro: "unico",
    entrega: "descarga",
    estado: "disponible",
    detalles: ["PDF", "320 páginas", "Formatos editables"],
    destacado: true,
  },
  {
    id: "responsabilidades-administrativas",
    categoria: "libros",
    titulo: "Responsabilidades administrativas de los servidores públicos",
    resumen:
      "Faltas graves y no graves, procedimiento de investigación y substanciación, y defensa del servidor público.",
    precioCentavos: 38_000,
    cobro: "unico",
    entrega: "descarga",
    estado: "disponible",
    detalles: ["PDF", "240 páginas"],
  },
  {
    id: "guia-ejecucion-fiscal",
    categoria: "libros",
    titulo: "Guía del procedimiento administrativo de ejecución",
    resumen:
      "Requerimiento, embargo y remate explicados paso a paso desde la experiencia en tesorerías y recaudaciones de rentas.",
    precioCentavos: 22_000,
    cobro: "unico",
    entrega: "descarga",
    estado: "disponible",
    detalles: ["PDF", "120 páginas"],
  },
  {
    id: "curso-sistema-anticorrupcion",
    categoria: "cursos",
    titulo: "Sistema anticorrupción: del diseño a la práctica",
    resumen:
      "Programa completo sobre la operación de los sistemas anticorrupción, órganos internos de control y fiscalización superior.",
    precioCentavos: 180_000,
    cobro: "unico",
    entrega: "acceso",
    estado: "disponible",
    detalles: ["12 sesiones en video", "8 horas", "Constancia"],
    destacado: true,
  },
  {
    id: "curso-juicio-nulidad",
    categoria: "cursos",
    titulo: "Taller de litigio en el juicio de nulidad",
    resumen:
      "Redacción de conceptos de impugnación, pruebas y alegatos, con análisis de casos resueltos.",
    precioCentavos: 95_000,
    cobro: "unico",
    entrega: "acceso",
    estado: "proximamente",
    detalles: ["6 sesiones en video", "5 horas"],
  },
  {
    id: "comunidad-whatsapp",
    categoria: "comunidad",
    titulo: "Comunidad de actualización jurídica",
    resumen:
      "Grupo de WhatsApp con criterios y reformas relevantes, comentarios de casos y espacio para preguntas.",
    precioCentavos: 29_900,
    cobro: "mensual",
    entrega: "invitacion",
    estado: "disponible",
    detalles: ["Acceso inmediato", "Cancelable en cualquier momento"],
    destacado: true,
  },
  {
    id: "asesoria-individual",
    categoria: "asesorias",
    titulo: "Asesoría individual",
    resumen:
      "Sesión en línea para revisar un asunto concreto en materia fiscal, administrativa o de responsabilidades.",
    precioCentavos: 150_000,
    cobro: "unico",
    entrega: "sesion",
    estado: "disponible",
    detalles: ["60 minutos", "En línea", "Agenda en el sitio"],
    destacado: true,
  },
  {
    id: "dictamen-tecnico",
    categoria: "asesorias",
    titulo: "Dictamen técnico y evaluación de expediente",
    resumen:
      "Revisión documental de un expediente o proyecto normativo, con opinión escrita y recomendaciones.",
    precioCentavos: 350_000,
    cobro: "unico",
    entrega: "sesion",
    estado: "disponible",
    detalles: ["Opinión por escrito", "Sesión de entrega de 45 minutos"],
  },
];

export const PRODUCTOS_DESTACADOS: readonly Producto[] = PRODUCTOS.filter(
  (producto) => producto.destacado,
);

/** Agrupa el catálogo respetando el orden declarado en `CATEGORIAS`. */
export function productosPorCategoria(categoria: CategoriaId): readonly Producto[] {
  return PRODUCTOS.filter((producto) => producto.categoria === categoria);
}

const NOMBRES_CATEGORIA = new Map(CATEGORIAS.map(({ id, nombre }) => [id, nombre]));

export function nombreCategoria(categoria: CategoriaId): string {
  return NOMBRES_CATEGORIA.get(categoria) ?? "";
}
