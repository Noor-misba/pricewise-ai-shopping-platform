import { useMemo } from 'react';

export function MiniBarChart({
  data,
  height = 160,
  highlightIndex,
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  highlightIndex?: number;
}) {
  const max = useMemo(() => Math.max(...data.map((d) => d.value)) || 1, [data]);

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 28);
        const isHi = i === highlightIndex;
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end justify-center">
              <div
                className="w-full max-w-[42px] rounded-t-lg transition-all duration-700"
                style={{
                  height: Math.max(h, 4),
                  background: d.color ?? (isHi ? 'linear-gradient(180deg,#14b3ad,#0c908b)' : 'linear-gradient(180deg,#cbd5e1,#94a3b8)'),
                  boxShadow: isHi ? '0 0 20px rgba(20,179,173,0.5)' : 'none',
                }}
              />
              <span className="absolute -top-5 text-[10px] font-bold text-ink-700 dark:text-ink-200">
                {d.value >= 1000 ? `${(d.value / 1000).toFixed(0)}k` : d.value}
              </span>
            </div>
            <span className="max-w-full truncate text-[10px] font-medium text-ink-400">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
