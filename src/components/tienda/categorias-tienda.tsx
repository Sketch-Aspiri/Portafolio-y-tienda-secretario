import { CATEGORIAS, productosPorCategoria } from "@/content/tienda";
import {
  ExpandableCards,
  type ExpandableCardItem,
} from "@/components/ui/expandable-card";
import { CATEGORIA_ICONS } from "./categoria-iconos";

const ITEMS: ExpandableCardItem[] = CATEGORIAS.map((categoria) => {
  const Icon = CATEGORIA_ICONS[categoria.id];
  const productos = productosPorCategoria(categoria.id);

  return {
    id: categoria.id,
    titulo: categoria.nombre,
    descripcion: categoria.descripcion,
    meta: `${productos.length} ${productos.length === 1 ? "producto" : "productos"}`,
    detalles: productos.map((producto) => producto.titulo),
    icon: <Icon className="h-6 w-6" />,
  };
});

/** Las cuatro familias de producto; al abrir una muestra qué incluye. */
export function CategoriasTienda() {
  return <ExpandableCards items={ITEMS} label="Categorías de la tienda" />;
}
