import { Box } from '@mui/material';
import type { GraficoProfundidadFocoProps } from '../../types/dashboard';

export function GraficoProfundidadFoco({ datos, resumenCentral }: GraficoProfundidadFocoProps) {
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let acumulado = 0;

  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {datos.map((seg) => {
            const dash = (seg.porcentaje / 100) * circumference;
            const offset = -acumulado;
            acumulado += dash;
            return (
              <circle
                key={seg.nombre}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </g>
        <text x="50%" y="48%" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">
          {resumenCentral.valor}
        </text>
        <text x="50%" y="61%" textAnchor="middle" fontSize="10" fill="#64748b">
          {resumenCentral.etiqueta}
        </text>
      </svg>
    </Box>
  );
}