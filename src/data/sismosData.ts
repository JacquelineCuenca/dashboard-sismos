import sismosRaw from '../../sismos.json';

import type {
  BarraMagnitud,
  BarraPais,
  DatosDashboard,
  ElementoKpi,
  Filtros,
  OpcionesFiltros,
  PuntoAnual,
  RegistroSismo,
  SegmentoProfundidad,
} from '../types/dashboard';

export const FILTROS_INICIALES: Filtros = {
  idPais: 'todos',
  idPeriodo: '2020-2026',
  magnitudMinima: 4.5,
};

export const OPCIONES_FILTROS: OpcionesFiltros = {
  paises: [
    { valor: 'todos', etiqueta: 'Todos los países' },
    { valor: 'Colombia', etiqueta: 'Colombia' },
    { valor: 'Perú', etiqueta: 'Perú' },
    { valor: 'Panamá', etiqueta: 'Panamá' },
    { valor: 'Ecuador', etiqueta: 'Ecuador' },
    { valor: 'Venezuela', etiqueta: 'Venezuela' },
    { valor: 'Costa Rica', etiqueta: 'Costa Rica' },
    { valor: 'Otros', etiqueta: 'Otros' },
  ],
  periodos: [
    { valor: '2020-2026', etiqueta: '2020 - 2026' },
    { valor: '2020-2022', etiqueta: '2020 - 2022' },
    { valor: '2023-2026', etiqueta: '2023 - 2026' },
    { valor: '2025', etiqueta: '2025' },
  ],
  magnitudes: [
    { valor: 4.5, etiqueta: '≥ 4.5' },
    { valor: 5.0, etiqueta: '≥ 5.0' },
    { valor: 5.5, etiqueta: '≥ 5.5' },
    { valor: 6.0, etiqueta: '≥ 6.0' },
  ],
};

// Normaliza registros de sismos.json sin importar si vienen con nombres en inglés (USGS) o español
export const REGISTROS_SISMOS: RegistroSismo[] = Array.isArray(sismosRaw)
  ? (sismosRaw as Record<string, unknown>[]).map((item, idx) => {
      const fechaStr = String(item.fecha ?? item.time ?? '2020-01-01');
      const anioNum = Number(item.anio ?? new Date(fechaStr).getFullYear() ?? 2020);
      const magNum = Number(item.magnitud ?? item.mag ?? 4.5);
      const profNum = Number(item.profundidad ?? item.depth ?? 30);
      const lugarStr = String(item.lugar ?? item.place ?? '');
      const paisStr = String(item.pais ?? extraerPais(lugarStr));

      return {
        id: String(item.id ?? idx),
        fecha: fechaStr,
        anio: anioNum,
        pais: paisStr,
        magnitud: magNum,
        profundidad: profNum,
        lugar: lugarStr,
      };
    })
  : [];

function extraerPais(lugar: string): string {
  const paisesConocidos = ['Colombia', 'Perú', 'Peru', 'Panamá', 'Panama', 'Ecuador', 'Venezuela', 'Costa Rica'];
  for (const p of paisesConocidos) {
    if (lugar.toLowerCase().includes(p.toLowerCase())) {
      if (p === 'Peru') return 'Perú';
      if (p === 'Panama') return 'Panamá';
      return p;
    }
  }
  return 'Otros';
}

export function calcularDatosDashboard(
  registros: RegistroSismo[],
  filtros: Filtros
): DatosDashboard {
  const filtrados = registros.filter((s) => {
    const cumplePais = filtros.idPais === 'todos' || s.pais === filtros.idPais;
    const cumpleMag = s.magnitud >= filtros.magnitudMinima;

    let cumplePeriodo = true;
    if (filtros.idPeriodo === '2020-2022') cumplePeriodo = s.anio >= 2020 && s.anio <= 2022;
    else if (filtros.idPeriodo === '2023-2026') cumplePeriodo = s.anio >= 2023 && s.anio <= 2026;
    else if (filtros.idPeriodo === '2025') cumplePeriodo = s.anio === 2025;

    return cumplePais && cumpleMag && cumplePeriodo;
  });

  const total = filtrados.length;
  const maxSismo = filtrados.reduce<RegistroSismo | null>(
    (max, actual) => (!max || actual.magnitud > max.magnitud ? actual : max),
    null
  );
  const profPromedio =
    total > 0 ? Math.round(filtrados.reduce((acc, s) => acc + s.profundidad, 0) / total) : 0;
  const profundidadesOrdenadas = [...filtrados].map((s) => s.profundidad).sort((a, b) => a - b);
  const medianaProf =
    total > 0 ? Math.round(profundidadesOrdenadas[Math.floor(total / 2)]) : 0;
  const maxProf = total > 0 ? Math.round(profundidadesOrdenadas[total - 1]) : 0;
  const sismosMayores = filtrados.filter((s) => s.magnitud >= 5.5).length;
  const pctMayores = total > 0 ? ((sismosMayores / total) * 100).toFixed(1) : '0.0';

  const kpis: ElementoKpi[] = [
    {
      titulo: 'Sismos registrados',
      valor: total,
      valorTexto: total.toLocaleString('en-US'),
      detalles: [{ texto: `${filtrados.filter((s) => s.anio === 2025).length} en 2025`, tono: 'neutro' }],
      icono: { nombre: 'pulso', color: '#2563eb', fondo: '#eff6ff' },
    },
    {
      titulo: 'Magnitud máxima',
      valor: maxSismo ? maxSismo.magnitud : 0,
      valorTexto: maxSismo ? maxSismo.magnitud.toFixed(1) : '0.0',
      unidad: 'Mw',
      detalles: [{ texto: maxSismo?.lugar || 'Sin registros', tono: 'neutro' }],
      icono: { nombre: 'rayo', color: '#eab308', fondo: '#fefce8' },
    },
    {
      titulo: 'Profundidad promedio',
      valor: profPromedio,
      valorTexto: String(profPromedio),
      unidad: 'km',
      detalles: [{ texto: `Mediana: ${medianaProf} · máx: ${maxProf} km`, tono: 'neutro' }],
      icono: { nombre: 'capas', color: '#3b82f6', fondo: '#eff6ff' },
    },
    {
      titulo: 'Sismos ≥ M5.5',
      valor: sismosMayores,
      valorTexto: String(sismosMayores),
      detalles: [{ texto: `${pctMayores}% del total de sismos`, tono: 'neutro' }],
      icono: { nombre: 'alerta', color: '#ef4444', fondo: '#fef2f2' },
    },
  ];

  // Serie anual 2020-2026
  const anios = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const conteoAnual = anios.map((anio) => ({
    anio,
    cantidad: filtrados.filter((s) => s.anio === anio).length,
    esParcial: anio === 2026,
  }));
  const maxAnual = Math.max(...conteoAnual.map((a) => a.cantidad), 0);
  const sismosPorAnio: PuntoAnual[] = conteoAnual.map((item) => ({
    ...item,
    destacado: item.cantidad === maxAnual && maxAnual > 0,
  }));

  // Barras por país
  const coloresPais: Record<string, string> = {
    Colombia: '#b91c1c',
    Perú: '#dc2626',
    Panamá: '#f97316',
    Ecuador: '#fde047',
    Venezuela: '#bef264',
    'Costa Rica': '#fef08a',
    Otros: '#d8b4fe',
  };
  const sismosPorPais: BarraPais[] = Object.keys(coloresPais).map((pais) => ({
    pais,
    cantidad: filtrados.filter((s) => s.pais === pais).length,
    color: coloresPais[pais],
  }));

  // Distribución por magnitud
  const rangosMag = [
    { etiquetaRango: 'M4.5-4.9', min: 4.5, max: 5.0, color: '#7c3aed' },
    { etiquetaRango: 'M5.0-5.4', min: 5.0, max: 5.5, color: '#8b5cf6' },
    { etiquetaRango: 'M5.5-5.9', min: 5.5, max: 6.0, color: '#a78bfa' },
    { etiquetaRango: 'M6.0-6.4', min: 6.0, max: 6.5, color: '#93c5fd' },
    { etiquetaRango: 'M6.5+', min: 6.5, max: 99, color: '#bfdbfe' },
  ];
  const distribucionMagnitud: BarraMagnitud[] = rangosMag.map((r) => ({
    etiquetaRango: r.etiquetaRango,
    cantidad: filtrados.filter((s) => s.magnitud >= r.min && s.magnitud < r.max).length,
    color: r.color,
  }));

  // Profundidad del foco
  const estratos = [
    { nombre: 'Superficial', etiquetaRango: '(<30 km)', min: -10, max: 30, color: '#ea580c' },
    { nombre: 'Intermedia', etiquetaRango: '(30–70 km)', min: 30, max: 70, color: '#f59e0b' },
    { nombre: 'Profunda', etiquetaRango: '(70–300 km)', min: 70, max: 300, color: '#2563eb' },
    { nombre: 'Muy profunda', etiquetaRango: '(>300 km)', min: 300, max: 9999, color: '#7c3aed' },
  ];
  const profundidadFoco: SegmentoProfundidad[] = estratos.map((e) => {
    const cant = filtrados.filter((s) => s.profundidad >= e.min && s.profundidad < e.max).length;
    const pct = total > 0 ? Number(((cant / total) * 100).toFixed(1)) : 0;
    return {
      nombre: e.nombre,
      etiquetaRango: e.etiquetaRango,
      cantidad: cant,
      porcentaje: pct,
      color: e.color,
    };
  });

  const superficial = profundidadFoco[0];

  return {
    encabezado: {
      titulo: 'Monitor de sismos: Noroeste de Sudamérica y Centroamérica',
      subtitulo: `Sismos de magnitud ${filtros.magnitudMinima.toFixed(1)} o mayor · 3 ene 2020 – 1 ene 2026`,
      rutaLogo: `${import.meta.env.BASE_URL}IconoSismoDashboard.jpg`,
    },
    kpis,
    graficos: {
      sismosPorAnio,
      sismosPorPais,
      distribucionMagnitud,
      profundidadFoco,
      resumenCentralProfundidad: {
        valor: `${superficial ? superficial.porcentaje : 0}%`,
        etiqueta: '<30 km',
      },
    },
    piePagina: 'Datos: catálogo USGS · magnitud 4.5+ · Monitoreo de Sismos',
  };
}