import { Box, Chip, Paper } from '@mui/material';
import type { TarjetaGraficoProps } from '../../types/dashboard';

export function TarjetaGrafico({ titulo, subtitulo, anotacion, children }: TarjetaGraficoProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        bgcolor: '#ffffff',
        border: '1px solid #cbd5e1',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 2,
        }}
      >
        <Box>
          <Box component="h3" sx={{ m: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            {titulo}
          </Box>
          <Box component="p" sx={{ m: 0, mt: 0.25, fontSize: '0.78rem', color: '#64748b' }}>
            {subtitulo}
          </Box>
        </Box>
        {anotacion && (
          <Chip
            label={anotacion}
            size="small"
            sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 600, fontSize: '0.72rem' }}
          />
        )}
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </Box>
    </Paper>
  );
}