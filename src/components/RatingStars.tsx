import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

export function RatingStars({
  value,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = value >= i;
          const half = !filled && value >= i - 0.5;
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled || half ? 'text-accent-400' : 'text-ink-300 dark:text-ink-700',
              )}
              fill={filled ? 'currentColor' : half ? 'currentColor' : 'none'}
              strokeWidth={filled || half ? 0 : 1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
