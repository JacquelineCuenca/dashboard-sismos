import { Box, Typography } from '@mui/material';
import type { PiePaginaProps } from '../../types/dashboard';

export function PiePagina({ texto }: PiePaginaProps) {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="caption" color="text.secondary">
        {texto}
      </Typography>
    </Box>
  );
}