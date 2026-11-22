import { Button } from '@mui/material';
import type { OpcionFiltroProps } from '../../types/dashboard';

export function OpcionFiltro({ etiqueta, seleccionado, alHacerClic }: OpcionFiltroProps) {
  return (
    <Button
      size="small"
      onClick={alHacerClic}
      variant={seleccionado ? 'contained' : 'text'}
      disableElevation
      sx={{
        minWidth: 54,
        borderRadius: 1.5,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.78rem',
        color: seleccionado ? '#fff' : 'text.secondary',
        bgcolor: seleccionado ? '#2563eb' : 'transparent',
        '&:hover': {
          bgcolor: seleccionado ? '#1d4ed8' : '#e2e8f0',
        },
      }}
    >
      {etiqueta}
    </Button>
  );
}