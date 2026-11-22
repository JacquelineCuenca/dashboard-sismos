import { Paper, Box } from '@mui/material';
import type { PanelFiltrosProps } from '../../types/dashboard';
import { CampoSeleccion } from './CampoSeleccion';
import { FiltroMagnitud } from './FiltroMagnitud';
import { BotonRestablecer } from './BotonRestablecer';

export function PanelFiltros({ valor, opciones, alCambiar, alRestablecer }: PanelFiltrosProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: '#ffffff',
        borderColor: '#e2e8f0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', md: 'flex-end' },
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'flex-end' },
          }}
        >
          <CampoSeleccion
            etiqueta="PAÍS"
            valor={valor.idPais}
            opciones={opciones.paises}
            alCambiar={(idPais) => alCambiar({ ...valor, idPais })}
          />
          <CampoSeleccion
            etiqueta="PERÍODO"
            valor={valor.idPeriodo}
            opciones={opciones.periodos}
            alCambiar={(idPeriodo) => alCambiar({ ...valor, idPeriodo })}
          />
          <FiltroMagnitud
            etiqueta="MAGNITUD MÍNIMA"
            valor={valor.magnitudMinima}
            opciones={opciones.magnitudes}
            alCambiar={(magnitudMinima) => alCambiar({ ...valor, magnitudMinima })}
          />
        </Box>

        <BotonRestablecer etiqueta="Restablecer filtros" alHacerClic={alRestablecer} />
      </Box>
    </Paper>
  );
}