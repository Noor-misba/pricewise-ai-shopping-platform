import { useMemo } from 'react';

export function DonutChart({
  segments,
  size = 160,
  thickness = 22,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = useMemo(
    () => segments.reduce((a, b) => a + b.value, 0) || 1,
    [segments],
  );
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={thickness}
            className="stroke-ink-100 dark:stroke-white/5"
          />
          {segments.map((s, i) => {
            const len = (s.value / total) * circ;
            const dash = `${len} ${circ - len}`;
            const el = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="transition-all duration-700"
                style={{ animation: `fade-in 0.6s ease ${i * 0.1}s both` }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <p className="font-display text-xl font-extrabold">{centerValue}</p>
          )}
          {centerLabel && (
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">
              {centerLabel}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
            <span className="text-xs font-medium text-ink-600 dark:text-ink-300">
              {s.label}
            </span>
            <span className="text-xs font-bold text-ink-400">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
