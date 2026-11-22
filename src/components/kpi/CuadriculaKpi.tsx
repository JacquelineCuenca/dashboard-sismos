import { Grid } from '@mui/material';
import type { CuadriculaKpiProps } from '../../types/dashboard';
import { TarjetaKpi } from './TarjetaKpi';

export function CuadriculaKpi({ elementos }: CuadriculaKpiProps) {
  return (
    <Grid
      container
      spacing={3}
      rowSpacing={3}
    >
      {elementos.map((kpi) => (
        <Grid key={kpi.titulo} size={{ xs: 12, sm: 6, md: 3 }}>
          <TarjetaKpi
            titulo={kpi.titulo}
            valor={kpi.valor}
            valorTexto={kpi.valorTexto}
            unidad={kpi.unidad}
            detalles={kpi.detalles}
            icono={kpi.icono}
          />
        </Grid>
      ))}
    </Grid>
  );
}