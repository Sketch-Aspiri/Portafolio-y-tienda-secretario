/**
 * Tipos del catálogo de la tienda (libros, cursos, comunidad y asesorías).
 * El contenido vive en `@/content/tienda`; aquí solo se describe su forma.
 */

/** Familias de producto que ofrece el sitio. Ordena y agrupa el catálogo. */
export type CategoriaId = "libros" | "cursos" | "comunidad" | "asesorias";

/**
 * Cómo recibe el cliente lo que compró. Determina qué hace el webhook de Stripe
 * al confirmar el pago (enviar enlace firmado, invitación o correo de cita).
 */
export type TipoEntrega = "descarga" | "acceso" | "invitacion" | "sesion";

/** Cobro único (libro, curso, asesoría) o recurrente (comunidad). */
export type TipoCobro = "unico" | "mensual";

/** Un producto sin precio publicado aún se muestra, pero no se puede comprar. */
export type EstadoProducto = "disponible" | "proximamente";

export interface CategoriaTienda {
  id: CategoriaId;
  nombre: string;
  /** Frase corta que explica la familia de producto en la portada. */
  descripcion: string;
}

export interface Producto {
  /** Slug estable: será la ruta del producto y la referencia en Stripe. */
  id: string;
  categoria: CategoriaId;
  titulo: string;
  resumen: string;
  /**
   * Precio en centavos de peso, que es la unidad que espera Stripe.
   * Evita decimales flotantes al calcular totales.
   */
  precioCentavos: number;
  cobro: TipoCobro;
  entrega: TipoEntrega;
  estado: EstadoProducto;
  /** Ficha breve: formato, duración, número de páginas, cupo. */
  detalles: readonly string[];
  /**
   * Ruta pública de la portada, en `public/images/tienda/`.
   * Sin ella la tarjeta se pinta con el panel institucional.
   */
  imagen?: string;
  /** Se muestra en la portada, dentro de la selección destacada. */
  destacado?: boolean;
}
