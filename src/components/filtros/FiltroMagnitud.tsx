import { Box } from '@mui/material';
import type { FiltroMagnitudProps } from '../../types/dashboard';
import { OpcionFiltro } from './OpcionFiltro';

export function FiltroMagnitud({ etiqueta, valor, opciones, alCambiar }: FiltroMagnitudProps) {
  return (
    <Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#64748b',
          mb: 0.5,
          letterSpacing: 0.5,
        }}
      >
        {etiqueta}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 0.5,
          bgcolor: '#f1f5f9',
          p: 0.5,
          borderRadius: 2,
          border: '1px solid #e2e8f0',
        }}
      >
        {opciones.map((op) => (
          <OpcionFiltro
            key={op.valor}
            etiqueta={op.etiqueta}
            seleccionado={valor === op.valor}
            alHacerClic={() => alCambiar(op.valor)}
          />
        ))}
      </Box>
    </Box>
  );
}