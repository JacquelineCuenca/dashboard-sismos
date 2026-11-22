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
          width: { xs: 92, sm: 104 },
          height: { xs: 62, sm: 70 },
          borderRadius: 3, // esquinas redondeadas como en el prototipo
          bgcolor: '#ffffff',
          overflow: 'hidden',
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
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <Box>
        <Box
          component="h1"
          sx={{ m: 0, fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 700, color: '#0f172a' }}
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