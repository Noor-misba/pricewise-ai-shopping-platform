import { useMemo, useState } from 'react';

export function LineChart({
  data,
  height = 200,
  color = '#14b3ad',
  fillFrom = 'rgba(20,179,173,0.25)',
  fillTo = 'rgba(20,179,173,0)',
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  fillFrom?: string;
  fillTo?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 600;
  const pad = 10;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2 - 20;

  const { points, areaPath, linePath } = useMemo(() => {
    if (data.length === 0) return { points: [], areaPath: '', linePath: '' };
    const min = Math.min(...data.map((d) => d.value));
    const max = Math.max(...data.map((d) => d.value));
    const range = max - min || 1;
    const stepX = innerW / (data.length - 1 || 1);
    const pts = data.map((d, i) => {
      const x = pad + i * stepX;
      const y = pad + innerH - ((d.value - min) / range) * innerH;
      return { x, y, ...d };
    });
    const line = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
    const area =
      `M ${pts[0].x.toFixed(1)} ${(pad + innerH).toFixed(1)} ` +
      pts.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
      ` L ${pts[pts.length - 1].x.toFixed(1)} ${(pad + innerH).toFixed(1)} Z`;
    return { points: pts, areaPath: area, linePath: line };
  }, [data, innerW, innerH, pad]);

  const gid = `grad-${color.replace('#', '')}`;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillFrom} />
            <stop offset="100%" stopColor={fillTo} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gid})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === i ? 5 : 3}
              fill={color}
              stroke="white"
              strokeWidth="1.5"
              className="transition-all"
            />
            <rect
              x={p.x - stepXWidth(points)}
              y={0}
              width={stepXWidth(points) * 2}
              height={height}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          </g>
        ))}
      </svg>
      {hover !== null && points[hover] && (
        <div
          className="glass-strong pointer-events-none absolute -translate-x-1/2 rounded-xl px-3 py-1.5 text-xs font-bold shadow-soft dark:shadow-soft-dark"
          style={{ left: `${(points[hover].x / width) * 100}%`, top: 0 }}
        >
          {points[hover].label}: ₹{points[hover].value.toLocaleString('en-IN')}
        </div>
      )}
      <div className="mt-2 flex justify-between px-1">
        {data.map((d, i) => (
          <span key={i} className="text-[10px] font-medium text-ink-400">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function stepXWidth(points: { x: number }[]) {
  if (points.length < 2) return 20;
  return Math.abs(points[1].x - points[0].x) / 2;
}
