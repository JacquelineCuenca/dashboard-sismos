import { Box, FormControl, MenuItem, Select } from '@mui/material';
import type { CampoSeleccionProps } from '../../types/dashboard';

export function CampoSeleccion({ etiqueta, valor, opciones, alCambiar }: CampoSeleccionProps) {
  return (
    <Box sx={{ minWidth: 165 }}>
      <Box
        component="label"
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
      <FormControl fullWidth size="small">
        <Select
          value={valor}
          onChange={(e) => alCambiar(e.target.value)}
          sx={{ borderRadius: 2, bgcolor: '#ffffff' }}
        >
          {opciones.map((op) => (
            <MenuItem key={op.valor} value={op.valor}>
              {op.etiqueta}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}