import { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { navigate } from '../router';
import { cn } from '../lib/utils';

const EXAMPLES = ['Lakme Lipstick', 'iPhone 16', 'Samsung S25', 'Boat Earbuds', 'Nike Shoes'];

export function SearchBar({
  initial = '',
  large = false,
  className,
}: {
  initial?: string;
  large?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(initial);
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof PRODUCTS>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => setValue(initial), [initial]);

  useEffect(() => {
    const q = value.trim().toLowerCase();
    if (!q || !focused) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      ).slice(0, 5),
    );
  }, [value, focused]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submit = (q?: string) => {
    const query = (q ?? value).trim();
    navigate({ name: 'search', query });
    setFocused(false);
  };

  return (
    <div ref={boxRef} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'glass-strong flex items-center gap-3 rounded-full pl-5 pr-2 transition-all duration-300',
          large ? 'py-2.5 shadow-glow' : 'py-2 shadow-soft dark:shadow-soft-dark',
          focused && 'ring-4 ring-brand-400/20',
        )}
      >
        <Search size={large ? 22 : 18} className="shrink-0 text-brand-500" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Search products..."
          className={cn(
            'w-full bg-transparent outline-none placeholder:text-ink-400',
            large ? 'text-lg' : 'text-sm',
          )}
        />
        {value && (
          <button
            onClick={() => setValue('')}
            className="rounded-full p-1.5 text-ink-400 hover:bg-ink-100 dark:hover:bg-white/10"
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}
        <button
          onClick={() => submit()}
          className={cn(
            'btn bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow',
            large ? 'px-5 py-2.5' : 'px-4 py-2',
          )}
        >
          <Sparkles size={16} />
          <span className="hidden sm:inline">Compare</span>
        </button>
      </div>

      {focused && (suggestions.length > 0 || EXAMPLES.length > 0) && (
        <div className="glass-strong absolute z-40 mt-2 w-full overflow-hidden rounded-3xl p-2 shadow-soft dark:shadow-soft-dark animate-fade-up">
          {suggestions.length > 0 ? (
            <div className="mb-1">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => submit(p.name)}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left hover:bg-ink-100 dark:hover:bg-white/5"
                >
                  <img src={p.image} alt="" className="h-9 w-9 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-ink-500">{p.brand} · {p.category}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
                Try searching
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => submit(ex)}
                    className="chip bg-ink-100 dark:bg-white/5 text-ink-600 dark:text-ink-200 hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-500/20"
                  >
                    <Search size={12} /> {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
