import type {
  AreaExperiencia,
  Diplomado,
  Docencia,
  Materia,
  NivelFormacion,
} from "@/types/trayectoria";

/**
 * Contenido de la sección de trayectoria, tomado de la síntesis curricular.
 * Se edita aquí —sin tocar componentes— hasta que exista panel de administración.
 */

export const TRAYECTORIA_PERFIL =
  "Doctor en Ciencias de lo Fiscal y Licenciado en Derecho por la Universidad Autónoma de Yucatán. Su ejercicio profesional se ha desarrollado en los tres órdenes de gobierno —federal, estatal y municipal— en materia de derecho fiscal y administrativo, hacienda pública, fiscalización y sistemas anticorrupción, función que ha combinado con la cátedra universitaria y la impartición de cursos y conferencias especializadas.";

export const ESPECIALIDADES: readonly Materia[] = [
  { nombre: "Derecho Fiscal", icono: "fiscal" },
  { nombre: "Derecho Administrativo", icono: "administrativo" },
  { nombre: "Hacienda Pública", icono: "hacienda" },
  { nombre: "Fiscalización y Auditoría Gubernamental", icono: "fiscalizacion" },
  { nombre: "Sistemas Anticorrupción", icono: "anticorrupcion" },
  { nombre: "Ética e Integridad Pública", icono: "etica" },
];

export const FORMACION: readonly NivelFormacion[] = [
  {
    nivel: "Doctorado",
    grados: [
      {
        titulo: "Doctor en Ciencias de lo Fiscal",
        institucion: "Instituto de Especialización para Ejecutivos",
        estado: "concluido",
      },
      {
        titulo: "Doctorado en Derecho",
        institucion: "Universidad Anáhuac Mayab",
        estado: "candidato",
      },
      {
        titulo: "Doctorado en Gobierno y Gestión Pública",
        institucion: "Universidad Anáhuac Mayab",
        estado: "candidato",
      },
      {
        titulo: "Doctorado en Anticorrupción y Sistemas de Justicia",
        institucion: "Centro de Estudios de Posgrado",
        estado: "candidato",
      },
    ],
  },
  {
    nivel: "Maestría",
    grados: [
      {
        titulo: "Maestro en Impuestos",
        institucion: "Instituto de Especialización para Ejecutivos",
        estado: "concluido",
      },
      {
        titulo: "Maestro en Administración Tributaria",
        institucion: "Universidad Autónoma de Yucatán",
        estado: "concluido",
      },
      {
        titulo: "Maestría en Anticorrupción y Sistemas de Justicia",
        institucion: "Centro de Estudios de Posgrado",
        estado: "candidato",
      },
    ],
  },
  {
    nivel: "Especialidad",
    grados: [
      {
        titulo: "Especialidad en Derecho Fiscal y Corporativo",
        institucion: "Universidad Autónoma de Yucatán",
        estado: "concluido",
      },
      {
        titulo: "Especialidad en Administración Hacendaria Municipal",
        institucion:
          "Instituto Técnico para el Desarrollo de las Haciendas Públicas (INDETEC)",
        estado: "concluido",
      },
    ],
  },
  {
    nivel: "Licenciatura",
    grados: [
      {
        titulo: "Licenciado en Derecho",
        institucion: "Universidad Autónoma de Yucatán",
        estado: "concluido",
      },
    ],
  },
];

export const DIPLOMADOS: readonly Diplomado[] = [
  {
    nombre: "Derecho Constitucional y Amparo",
    institucion: "Suprema Corte de Justicia de la Nación",
  },
  {
    nombre: "Presupuesto basado en Resultados",
    institucion: "Universidad Nacional Autónoma de México",
  },
  {
    nombre: "Derecho Fiscal",
    institucion: "Instituto de Especialización para Ejecutivos",
  },
  {
    nombre: "Formación de Consultores",
    institucion: "Instituto de Especialización para Ejecutivos",
  },
  {
    nombre: "Impuestos",
    institucion: "Instituto de Especialización para Ejecutivos",
  },
  {
    nombre: "Contabilidad Gubernamental",
    institucion: "Asociación Nacional de Organismos de Fiscalización (ASOFIS)",
  },
  {
    nombre: "Disciplina Financiera",
    institucion: "Asociación Nacional de Organismos de Fiscalización (ASOFIS)",
  },
  {
    nombre: "Sistema Nacional de Fiscalización",
    institucion: "Asociación Nacional de Organismos de Fiscalización (ASOFIS)",
  },
];

/**
 * Ordenada del ámbito más reciente hacia el más antiguo: así aparece en pantalla.
 * Para poner fotografía a un bloque, deja el archivo en
 * `public/images/trayectoria/` y agrega `imagen: "/images/trayectoria/<archivo>"`.
 * Sin `imagen`, la fila se pinta con el panel institucional.
 */
export const EXPERIENCIA: readonly AreaExperiencia[] = [
  {
    area: "Fiscalización y anticorrupción",
    ambito: "Estatal",
    descripcion:
      "Coordinación institucional y dirección jurídica en órganos de control, fiscalización superior y combate a la corrupción.",
    cargos: [
      {
        puesto: "Secretario Técnico",
        institucion:
          "Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Quintana Roo",
      },
      {
        puesto: "Director de Asuntos Jurídicos",
        institucion: "Auditoría Superior del Estado de Quintana Roo",
      },
      {
        puesto: "Coordinador Jurídico",
        institucion: "Contraloría del Estado de Yucatán",
      },
    ],
  },
  {
    area: "Hacienda pública estatal y municipal",
    ambito: "Estatal y municipal",
    descripcion:
      "Conducción de las áreas de ingresos, recaudación y ejecución fiscal en tesorerías municipales y secretarías de finanzas.",
    cargos: [
      {
        puesto: "Director de Ingresos",
        institucion:
          "Tesorería del Municipio de Othón P. Blanco, Quintana Roo",
      },
      {
        puesto: "Subdirector Técnico de Ingresos",
        institucion: "Tesorería del Municipio de Benito Juárez, Quintana Roo",
      },
      {
        puesto: "Recaudador de Rentas en Isla Mujeres",
        institucion: "Secretaría de Finanzas del Estado de Quintana Roo",
      },
      {
        puesto: "Subrecaudador de Rentas en Benito Juárez",
        institucion: "Secretaría de Finanzas del Estado de Quintana Roo",
      },
      {
        puesto: "Jefe del Departamento de Ejecución Fiscal",
        institucion: "Secretaría de Hacienda del Estado de Yucatán",
      },
      {
        puesto: "Jefe de la Oficina de Asistencia al Contribuyente",
        institucion: "Secretaría de Hacienda del Estado de Yucatán",
      },
    ],
  },
  {
    area: "Administración pública federal",
    ambito: "Federal",
    descripcion:
      "Procedimientos legales y comercio exterior en la autoridad tributaria federal.",
    cargos: [
      {
        puesto: "Subadministrador de Procedimientos Legales y Comercio Exterior",
        institucion:
          "Servicio de Administración Tributaria, Secretaría de Hacienda y Crédito Público",
      },
    ],
  },
  {
    area: "Sector privado y consultoría",
    ambito: "Privado",
    descripcion:
      "Dirección jurídica corporativa y consultoría fiscal para empresas y despachos especializados.",
    cargos: [
      {
        puesto: "Director Jurídico",
        institucion: "Compañía de Ferrocarriles Chiapas Mayab, S.A. de C.V.",
      },
      {
        puesto: "Consultor Fiscal y Jurídico",
        institucion: "Despacho Orozco Felgueres, García Millán y Asociados",
      },
    ],
  },
];

export const DOCENCIA: Docencia = {
  instituciones: [
    "Instituto Tecnológico de Cancún",
    "Instituto Tecnológico de Chetumal",
    "Grupo Tecnológico Universitario, campus Mérida",
  ],
  temas: [
    "Derecho administrativo",
    "Derecho fiscal",
    "Derecho corporativo-empresarial",
    "Auditoría gubernamental",
    "Fiscalización",
    "Responsabilidades administrativas de los servidores públicos",
    "Políticas públicas",
    "Sistemas anticorrupción",
    "Ética e integridad pública",
  ],
};
