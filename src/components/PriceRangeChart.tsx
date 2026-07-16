import { useMemo } from 'react';
import { inr } from '../lib/utils';

export function PriceRangeChart({
  prices,
  best,
}: {
  prices: number[];
  best: number;
}) {
  const { min, max, avg } = useMemo(
    () => ({
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((a, b) => a + b, 0) / prices.length,
    }),
    [prices],
  );

  const range = max - min || 1;
  const pos = (v: number) => ((v - min) / range) * 100;

  return (
    <div className="w-full">
      <div className="relative h-3 rounded-full bg-gradient-to-r from-brand-400 via-accent-400 to-accent-600">
        <div
          className="absolute -top-1 h-5 w-1.5 -translate-x-1/2 rounded-full bg-ink-900 dark:bg-white"
          style={{ left: `${pos(avg)}%` }}
          title="Average"
        />
        <div
          className="absolute -top-2 h-7 w-2 -translate-x-1/2 rounded-full bg-brand-500 shadow-glow"
          style={{ left: `${pos(best)}%` }}
          title="Best price"
        />
      </div>
      <div className="mt-3 flex justify-between text-xs font-semibold">
        <div className="text-left">
          <p className="text-ink-400">Lowest</p>
          <p className="text-brand-600 dark:text-brand-400">{inr(min)}</p>
        </div>
        <div className="text-center">
          <p className="text-ink-400">Average</p>
          <p className="text-ink-700 dark:text-ink-200">{inr(Math.round(avg))}</p>
        </div>
        <div className="text-right">
          <p className="text-ink-400">Highest</p>
          <p className="text-accent-500">{inr(max)}</p>
        </div>
      </div>
    </div>
  );
}
