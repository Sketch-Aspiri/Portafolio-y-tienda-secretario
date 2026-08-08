/**
 * Tipos del contenido de trayectoria (formación, experiencia y docencia).
 * El contenido vive en `@/content/trayectoria`; aquí solo se describe su forma.
 */

/**
 * Los iconos se nombran desde los datos y se mapean a componentes en la vista,
 * para que el contenido siga siendo plano y serializable.
 */
export type MateriaIconName =
  | "fiscal"
  | "administrativo"
  | "hacienda"
  | "fiscalizacion"
  | "anticorrupcion"
  | "etica";

/** Materia de especialidad mostrada en el dock de la introducción. */
export interface Materia {
  nombre: string;
  icono: MateriaIconName;
}

/** Un grado concluido u obtenido, o uno en proceso de titulación. */
export type EstadoAcademico = "concluido" | "candidato";

export interface GradoAcademico {
  titulo: string;
  institucion: string;
  estado: EstadoAcademico;
}

/** Agrupa los grados de un mismo nivel (doctorado, maestría, etc.). */
export interface NivelFormacion {
  nivel: string;
  grados: readonly GradoAcademico[];
}

export interface Diplomado {
  nombre: string;
  institucion: string;
}

export interface Cargo {
  puesto: string;
  institucion: string;
}

/**
 * Bloque de cargos agrupados por ámbito profesional.
 * El orden del arreglo es el orden en pantalla: del cargo vigente hacia atrás.
 */
export interface AreaExperiencia {
  area: string;
  /** Orden de gobierno o sector, para la etiqueta lateral. */
  ambito: string;
  descripcion: string;
  /** Ruta pública de la fotografía; sin ella se pinta un panel institucional. */
  imagen?: string;
  cargos: readonly Cargo[];
}

export interface Docencia {
  instituciones: readonly string[];
  temas: readonly string[];
}
