import { Box } from '@mui/material';
import type { LeyendaGraficoProps } from '../../types/dashboard';

export function LeyendaGrafico({ elementos }: LeyendaGraficoProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
      {elementos.map((el) => (
        <Box
          key={el.nombre}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: el.color, flexShrink: 0 }} />
            <Box component="span" sx={{ fontSize: '0.78rem', color: '#64748b' }}>
              {el.nombre} {el.etiquetaRango}
            </Box>
          </Box>
          <Box component="span" sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
            {el.cantidad}{' '}
            <Box component="span" sx={{ color: '#64748b', fontWeight: 400 }}>
              ({el.porcentaje}%)
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}