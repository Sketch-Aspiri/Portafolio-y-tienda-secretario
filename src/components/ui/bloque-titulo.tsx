import { cn } from "@/lib/utils";

interface BloqueTituloProps {
  titulo: string;
  descripcion?: string;
  align?: "left" | "center";
}

/** Encabezado de cada bloque interno de una sección (regla dorada + serif). */
export function BloqueTitulo({
  titulo,
  descripcion,
  align = "left",
}: BloqueTituloProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCentered && "items-center text-center",
      )}
    >
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
        <h3 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {titulo}
        </h3>
        {isCentered ? (
          <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
        ) : null}
      </div>
      {descripcion ? (
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
          {descripcion}
        </p>
      ) : null}
    </div>
  );
}
