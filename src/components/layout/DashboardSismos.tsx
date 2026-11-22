import { useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { calcularDatosDashboard } from '../../data/sismosData';
import type { DashboardSismosProps, Filtros } from '../../types/dashboard';
import { EncabezadoDashboard } from './EncabezadoDashboard';
import { PiePagina } from './PiePagina';
import { PanelFiltros } from '../filtros/PanelFiltros';
import { CuadriculaKpi } from '../kpi/CuadriculaKpi';
import { CuadriculaGraficos } from '../graficos/CuadriculaGraficos';
import { TarjetaGrafico } from '../graficos/TarjetaGrafico';
import { GraficoSismosPorAnio } from '../graficos/GraficoSismosPorAnio';
import { GraficoSismosPorPais } from '../graficos/GraficoSismosPorPais';
import { GraficoDistribucionMagnitud } from '../graficos/GraficoDistribucionMagnitud';
import { GraficoProfundidadFoco } from '../graficos/GraficoProfundidadFoco';
import { LeyendaGrafico } from '../graficos/LeyendaGrafico';

export function DashboardSismos({
  datosDashboard,
  opcionesFiltros,
  filtrosIniciales,
  registros = [],
}: DashboardSismosProps) {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciales);

  const datosActuales = useMemo(() => {
    if (registros.length === 0) return datosDashboard;
    return calcularDatosDashboard(registros, filtros);
  }, [registros, filtros, datosDashboard]);

  const manejarRestablecer = () => {
    setFiltros(filtrosIniciales);
  };

  const anioDestacado = datosActuales.graficos.sismosPorAnio.find((p) => p.esParcial);

  return (
    <Box sx={{ maxWidth: 1280, mx: 'auto', p: { xs: 2, md: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Grid
        container
        spacing={3}
        rowSpacing={3}
        sx={{
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <Grid size={{ xs: 12 }}>
          <EncabezadoDashboard
            titulo={datosActuales.encabezado.titulo}
            subtitulo={datosActuales.encabezado.subtitulo}
            rutaLogo={datosActuales.encabezado.rutaLogo}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <PanelFiltros
            valor={filtros}
            opciones={opcionesFiltros}
            alCambiar={setFiltros}
            alRestablecer={manejarRestablecer}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CuadriculaKpi elementos={datosActuales.kpis} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CuadriculaGraficos>
            <Grid size={{ xs: 12, md: 6 }}>
              <TarjetaGrafico
                titulo="Sismos por año"
                subtitulo={`Tendencia anual de eventos M${filtros.magnitudMinima.toFixed(1)}+`}
                anotacion={anioDestacado ? `${anioDestacado.anio}* parcial` : undefined}
              >
                <GraficoSismosPorAnio datos={datosActuales.graficos.sismosPorAnio} />
              </TarjetaGrafico>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TarjetaGrafico titulo="Sismos por país" subtitulo={`Total ${filtros.idPeriodo}`}>
                <GraficoSismosPorPais datos={datosActuales.graficos.sismosPorPais} />
              </TarjetaGrafico>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TarjetaGrafico
                titulo="Distribución por magnitud"
                subtitulo="Cantidad de sismos por rango de magnitud"
              >
                <GraficoDistribucionMagnitud datos={datosActuales.graficos.distribucionMagnitud} />
              </TarjetaGrafico>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TarjetaGrafico
                titulo="Profundidad del foco"
                subtitulo="Distribución geotécnica por estrato"
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    gap: 2,
                    pt: 1,
                  }}
                >
                  <GraficoProfundidadFoco
                    datos={datosActuales.graficos.profundidadFoco}
                    resumenCentral={datosActuales.graficos.resumenCentralProfundidad}
                  />
                  <LeyendaGrafico elementos={datosActuales.graficos.profundidadFoco} />
                </Box>
              </TarjetaGrafico>
            </Grid>
          </CuadriculaGraficos>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <PiePagina texto={datosActuales.piePagina} />
        </Grid>
      </Grid>
    </Box>
  );
}