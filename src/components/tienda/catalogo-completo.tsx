import { CATEGORIAS, productosPorCategoria } from "@/content/tienda";
import { BloqueTitulo } from "@/components/ui/bloque-titulo";
import { Reveal } from "@/components/ui/reveal";
import { ProductoCard } from "./producto-card";

/** Catálogo agrupado por familia de producto, en el orden de `CATEGORIAS`. */
export function CatalogoCompleto() {
  return (
    <div className="flex w-full flex-col gap-20 md:gap-24">
      {CATEGORIAS.map((categoria) => {
        const productos = productosPorCategoria(categoria.id);

        if (productos.length === 0) return null;

        return (
          <Reveal key={categoria.id}>
            <div id={categoria.id} className="scroll-mt-24">
              <BloqueTitulo
                titulo={categoria.nombre}
                descripcion={categoria.descripcion}
              />

              <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {productos.map((producto) => (
                  <li key={producto.id}>
                    <ProductoCard producto={producto} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
