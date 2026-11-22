import { Grid } from '@mui/material';
import type { CuadriculaGraficosProps } from '../../types/dashboard';

export function CuadriculaGraficos({ children }: CuadriculaGraficosProps) {
  return (
    <Grid
      container
      spacing={3}
      rowSpacing={3}
    >
      {children}
    </Grid>
  );
}