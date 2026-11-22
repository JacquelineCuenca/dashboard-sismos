import { Box } from '@mui/material';
import type { EncabezadoDashboardProps } from '../../types/dashboard';

export function EncabezadoDashboard({ titulo, subtitulo, rutaLogo }: EncabezadoDashboardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: '#fee2e2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={rutaLogo}
          alt="Símbolo de sismo"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          sx={{ width: 24, height: 24 }}
        />
      </Box>

      <Box>
        <Box
          component="h1"
          sx={{ m: 0, fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}
        >
          {titulo}
        </Box>
        <Box
          component="p"
          sx={{ m: 0, mt: 0.25, fontSize: '0.875rem', color: '#64748b' }}
        >
          {subtitulo}
        </Box>
      </Box>
    </Box>
  );
}