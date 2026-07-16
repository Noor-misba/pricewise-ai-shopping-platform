import { STORES, type StoreName } from '../data/products';

export function StoreBadge({
  store,
  size = 'md',
}: {
  store: StoreName;
  size?: 'sm' | 'md' | 'lg';
}) {
  const meta = STORES.find((s) => s.name === store)!;
  const dim = size === 'sm' ? 'h-6 w-6 text-[10px]' : size === 'lg' ? 'h-10 w-10 text-sm' : 'h-8 w-8 text-xs';
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center justify-center rounded-xl font-bold text-white ${dim}`}
        style={{ backgroundColor: meta.color }}
      >
        {meta.logo}
      </span>
      <span className="text-sm font-semibold text-ink-800 dark:text-ink-100">{store}</span>
    </div>
  );
}
