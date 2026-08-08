import type { TipoCobro } from "@/types/tienda";

/** Precios sin centavos: el catálogo trabaja con cifras cerradas en pesos. */
const FORMATO_MXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const CENTAVOS_POR_PESO = 100;

/** Convierte la unidad de Stripe (centavos) al precio visible: `$450`. */
export function formatearPrecio(precioCentavos: number): string {
  return FORMATO_MXN.format(precioCentavos / CENTAVOS_POR_PESO);
}

/** Sufijo del precio; vacío en el pago único para no ensuciar la ficha. */
export function periodicidad(cobro: TipoCobro): string {
  return cobro === "mensual" ? "/ mes" : "";
}
