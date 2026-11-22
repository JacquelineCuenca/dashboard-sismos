import { Box } from '@mui/material';
import type { GraficoDistribucionMagnitudProps } from '../../types/dashboard';

export function GraficoDistribucionMagnitud({ datos }: GraficoDistribucionMagnitudProps) {
  const maxVal = Math.max(...datos.map((d) => d.cantidad), 1);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 185,
        pt: 2,
        px: 1,
      }}
    >
      {datos.map((item) => {
        const alturaPx = Math.max((item.cantidad / maxVal) * 125, 4);
        return (
          <Box
            key={item.etiquetaRango}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}
          >
            <Box component="span" sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
              {item.cantidad}
            </Box>
            <Box
              sx={{
                width: 34,
                height: `${alturaPx}px`,
                bgcolor: item.color,
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.3s ease',
              }}
            />
            <Box component="span" sx={{ fontSize: '0.7rem', color: '#64748b' }}>
              {item.etiquetaRango}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}