import { Box, Paper } from '@mui/material';
import type { TarjetaKpiProps } from '../../types/dashboard';

export function TarjetaKpi({ titulo, valorTexto, unidad, detalles, icono }: TarjetaKpiProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        borderRadius: 3,
        bgcolor: '#ffffff',
        border: '1px solid #cbd5e1',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Box component="span" sx={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
          {titulo}
        </Box>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            bgcolor: icono.fondo,
            color: icono.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
        >
          ●
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'baseline', mb: 0.75 }}>
        <Box component="strong" sx={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
          {valorTexto}
        </Box>
        {unidad && (
          <Box component="span" sx={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>
            {unidad}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {detalles.map((det, idx) => (
          <Box
            component="span"
            key={idx}
            sx={{
              fontSize: '0.75rem',
              px: det.tono === 'positivo' ? 0.75 : 0,
              borderRadius: 1,
              bgcolor: det.tono === 'positivo' ? '#dcfce7' : 'transparent',
              color: det.tono === 'positivo' ? '#15803d' : '#64748b',
              fontWeight: det.tono === 'positivo' ? 700 : 400,
            }}
          >
            {det.texto}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}