import { Box } from '@mui/material';
import type { GraficoSismosPorAnioProps } from '../../types/dashboard';

export function GraficoSismosPorAnio({ datos }: GraficoSismosPorAnioProps) {
  if (datos.length === 0) return null;

  const width = 460;
  const height = 210;
  const padX = 32;
  const padY = 30;
  const maxVal = Math.max(...datos.map((d) => d.cantidad), 1);

  const puntos = datos.map((d, i) => {
    const x =
      datos.length > 1
        ? padX + (i * (width - padX * 2)) / (datos.length - 1)
        : width / 2;
    const y = height - padY - (d.cantidad / maxVal) * (height - padY * 2);
    return { ...d, x, y };
  });

  const linePath = puntos.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${puntos[puntos.length - 1].x} ${height - padY} L ${puntos[0].x} ${height - padY} Z`;

  return (
    <Box sx={{ width: '100%' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <linearGradient id="areaSismos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#areaSismos)" />
        <path d={linePath} fill="none" stroke="#ea580c" strokeWidth="2.5" />

        {puntos.map((p) => (
          <g key={p.anio}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke="#ea580c" strokeWidth="2.5" />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="11"
              fontWeight={p.destacado ? '700' : '600'}
              fill={p.destacado ? '#ea580c' : '#475569'}
            >
              {p.cantidad}
              {p.destacado ? ' ★' : ''}
            </text>
            <text
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fill={p.esParcial ? '#ea580c' : '#64748b'}
            >
              {p.anio}
              {p.esParcial ? '*' : ''}
            </text>
          </g>
        ))}
      </svg>
    </Box>
  );
}