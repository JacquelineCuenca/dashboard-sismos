import type { ReactNode } from 'react';

export type Filtros = {
  idPais: string;
  idPeriodo: string;
  magnitudMinima: number;
};

export type Opcion = {
  valor: string;
  etiqueta: string;
};

export type DetalleKpi = {
  texto: string;
  tono?: 'positivo' | 'neutro';
};

export type ElementoKpi = {
  titulo: string;
  valor: number;
  valorTexto: string;
  unidad?: string;
  detalles: DetalleKpi[];
  icono: {
    nombre: string;
    color: string;
    fondo: string;
  };
};

export type PuntoAnual = {
  anio: number;
  cantidad: number;
  esParcial?: boolean;
  destacado?: boolean;
};

export type BarraPais = {
  pais: string;
  cantidad: number;
  color: string;
};

export type BarraMagnitud = {
  etiquetaRango: string;
  cantidad: number;
  color: string;
};

export type SegmentoProfundidad = {
  nombre: string;
  etiquetaRango: string;
  cantidad: number;
  porcentaje: number;
  color: string;
};

// --- Tipos auxiliares para datos globales ---
export interface OpcionMagnitud {
  valor: number;
  etiqueta: string;
}

export interface OpcionesFiltros {
  paises: Opcion[];
  periodos: Opcion[];
  magnitudes: OpcionMagnitud[];
}

export interface DatosDashboard {
  encabezado: {
    titulo: string;
    subtitulo: string;
    rutaLogo: string;
  };
  kpis: ElementoKpi[];
  graficos: {
    sismosPorAnio: PuntoAnual[];
    sismosPorPais: BarraPais[];
    distribucionMagnitud: BarraMagnitud[];
    profundidadFoco: SegmentoProfundidad[];
    resumenCentralProfundidad: {
      valor: string;
      etiqueta: string;
    };
  };
  piePagina: string;
}

export interface RegistroSismo {
  id?: string;
  fecha: string;       // formato ISO "YYYY-MM-DD"
  anio: number;
  pais: string;
  magnitud: number;
  profundidad: number;
  lugar?: string;
}

// --- Props de los 18 componentes ---
export interface DashboardSismosProps {
  datosDashboard: DatosDashboard;
  opcionesFiltros: OpcionesFiltros;
  filtrosIniciales: Filtros;
  registros?: RegistroSismo[];
}

export interface EncabezadoDashboardProps {
  titulo: string;
  subtitulo: string;
  rutaLogo: string;
}

export interface PanelFiltrosProps {
  valor: Filtros;
  opciones: OpcionesFiltros;
  alCambiar: (nuevosFiltros: Filtros) => void;
  alRestablecer: () => void;
}

export interface CampoSeleccionProps {
  etiqueta: string;
  valor: string;
  opciones: Opcion[];
  alCambiar: (nuevoValor: string) => void;
}

export interface FiltroMagnitudProps {
  etiqueta: string;
  valor: number;
  opciones: OpcionMagnitud[];
  alCambiar: (nuevaMagnitud: number) => void;
}

export interface OpcionFiltroProps {
  etiqueta: string;
  seleccionado: boolean;
  alHacerClic: () => void;
}

export interface BotonRestablecerProps {
  etiqueta: string;
  alHacerClic: () => void;
}

export interface CuadriculaKpiProps {
  elementos: ElementoKpi[];
}

export interface TarjetaKpiProps {
  titulo: string;
  valor: number;
  valorTexto: string;
  unidad?: string;
  detalles: DetalleKpi[];
  icono: {
    nombre: string;
    color: string;
    fondo: string;
  };
}

export interface CuadriculaGraficosProps {
  children: ReactNode;
}

export interface TarjetaGraficoProps {
  titulo: string;
  subtitulo: string;
  anotacion?: string;
  children: ReactNode;
}

export interface GraficoSismosPorAnioProps {
  datos: PuntoAnual[];
}

export interface GraficoSismosPorPaisProps {
  datos: BarraPais[];
}

export interface GraficoDistribucionMagnitudProps {
  datos: BarraMagnitud[];
}

export interface GraficoProfundidadFocoProps {
  datos: SegmentoProfundidad[];
  resumenCentral: {
    valor: string;
    etiqueta: string;
  };
}

export interface LeyendaGraficoProps {
  elementos: SegmentoProfundidad[];
}

export interface PiePaginaProps {
  texto: string;
}