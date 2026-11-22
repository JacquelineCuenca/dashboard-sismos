import { Button } from '@mui/material';
import type { BotonRestablecerProps } from '../../types/dashboard';

export function BotonRestablecer({ etiqueta, alHacerClic }: BotonRestablecerProps) {
  return (
    <Button
      variant="text"
      size="small"
      onClick={alHacerClic}
      sx={{
        textTransform: 'none',
        color: 'text.secondary',
        fontWeight: 600,
        '&:hover': { color: 'primary.main', bgcolor: '#eff6ff' },
      }}
    >
      ↺ {etiqueta}
    </Button>
  );
}