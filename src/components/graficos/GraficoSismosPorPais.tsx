import { Box } from '@mui/material';
import type { GraficoSismosPorPaisProps } from '../../types/dashboard';

export function GraficoSismosPorPais({ datos }: GraficoSismosPorPaisProps) {
  const maxVal = Math.max(...datos.map((d) => d.cantidad), 1);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.4 }}>
      {datos.map((item) => {
        const pct = (item.cantidad / maxVal) * 100;
        return (
          <Box
            key={item.pais}
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}
          >
            <Box component="span" sx={{ width: 78, fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              {item.pais}
            </Box>
            <Box sx={{ flexGrow: 1, height: 10, bgcolor: '#f1f5f9', borderRadius: 5, overflow: 'hidden' }}>
              <Box
                sx={{
                  width: `${pct}%`,
                  height: '100%',
                  bgcolor: item.color,
                  borderRadius: 5,
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
            <Box
              component="span"
              sx={{ width: 32, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}
            >
              {item.cantidad}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}