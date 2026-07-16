import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BrainCircuit,
  Filter,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import {
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  STORES,
  bestOffer,
  searchProducts,
  type Product,
} from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ComparisonTable } from '../components/ComparisonTable';
import { AIRecommendation } from '../components/AIRecommendation';
import { PriceRangeChart } from '../components/PriceRangeChart';
import { LineChart } from '../components/LineChart';
import { Confetti } from '../components/Confetti';
import { SkeletonGrid } from '../components/Skeleton';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { useToast } from '../context/ToastContext';
import { navigate } from '../router';
import { inr, avg, cn } from '../lib/utils';

type SortKey = 'lowest' | 'highest' | 'rating' | 'delivery' | 'discount';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'lowest', label: 'Lowest Price' },
  { key: 'highest', label: 'Highest Price' },
  { key: 'rating', label: 'Highest Rating' },
  { key: 'delivery', label: 'Fastest Delivery' },
  { key: 'discount', label: 'Best Discount' },
];

export function SearchPage({ query }: { query: string }) {
  const results = useMemo(() => searchProducts(query), [query]);
  const [loading, setLoading] = useState(true);
  const [confettiKey, setConfettiKey] = useState(0);
  const [sort, setSort] = useState<SortKey>('lowest');
  const [selectedId, setSelectedId] = useState<string | null>(results[0]?.id ?? null);
  const [showFilters, setShowFilters] = useState(false);

  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [storeFilter, setStoreFilter] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(150000);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxDelivery, setMaxDelivery] = useState<number>(7);

  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setSelectedId(results[0]?.id ?? null);
  }, [results]);

  const filtered = useMemo(() => {
    let list = [...results];
    if (brandFilter.length) list = list.filter((p) => brandFilter.includes(p.brand));
    if (categoryFilter.length) list = list.filter((p) => categoryFilter.includes(p.category));
    list = list.filter((p) => {
      const o = bestOffer(p);
      return (
        o.price <= maxPrice &&
        o.rating >= minRating &&
        o.deliveryDays <= maxDelivery &&
        (storeFilter.length === 0 || p.offers.some((of) => storeFilter.includes(of.store)))
      );
    });

    const score = (p: Product) => {
      const o = bestOffer(p);
      switch (sort) {
        case 'lowest': return o.price;
        case 'highest': return -o.price;
        case 'rating': return -o.rating;
        case 'delivery': return o.deliveryDays;
        case 'discount': return -((o.mrp - o.price) / o.mrp);
      }
    };
    list.sort((a, b) => score(a) - score(b));
    return list;
  }, [results, brandFilter, categoryFilter, storeFilter, maxPrice, minRating, maxDelivery, sort]);

  const selected = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedId) ?? filtered[0] ?? null,
    [selectedId, filtered],
  );

  const analytics = useMemo(() => {
    if (!selected) return null;
    const prices = selected.offers.map((o) => o.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const a = avg(prices);
    return {
      min,
      max,
      avg: a,
      diff: max - min,
      savings: Math.round(max - min),
    };
  }, [selected]);

  const priceHistory = useMemo(() => {
    if (!selected) return [];
    const base = bestOffer(selected).price;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((d, i) => ({
      label: d,
      value: Math.round(base + Math.sin(i * 1.3) * (base * 0.03) + (Math.random() - 0.5) * (base * 0.02)),
    }));
  }, [selected]);

  const celebrateBestDeal = () => {
    setConfettiKey((k) => k + 1);
    toast({
      type: 'success',
      title: 'Best deal found!',
      message: `Save ${inr(analytics?.savings ?? 0)} by buying from ${bestOffer(selected!).store}.`,
    });
  };

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const resetFilters = () => {
    setBrandFilter([]);
    setCategoryFilter([]);
    setStoreFilter([]);
    setMaxPrice(150000);
    setMinRating(0);
    setMaxDelivery(7);
    toast({ type: 'info', title: 'Filters reset' });
  };

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-400">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => toggle(categoryFilter, setCategoryFilter, c)}
              className={cn(
                'chip border transition-all duration-300 active:scale-95',
                categoryFilter.includes(c)
                  ? 'border-brand-400 bg-brand-500/15 text-brand-700 dark:text-brand-300 shadow-glow'
                  : 'border-ink-200 dark:border-white/10 text-ink-500 dark:text-ink-300 hover:border-brand-300',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-400">Brand</p>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => toggle(brandFilter, setBrandFilter, b)}
              className={cn(
                'chip border transition-all duration-300 active:scale-95',
                brandFilter.includes(b)
                  ? 'border-brand-400 bg-brand-500/15 text-brand-700 dark:text-brand-300 shadow-glow'
                  : 'border-ink-200 dark:border-white/10 text-ink-500 dark:text-ink-300 hover:border-brand-300',
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-400">Store</p>
        <div className="flex flex-wrap gap-2">
          {STORES.map((s) => (
            <button
              key={s.name}
              onClick={() => toggle(storeFilter, setStoreFilter, s.name)}
              className={cn(
                'chip border transition-all duration-300 active:scale-95',
                storeFilter.includes(s.name)
                  ? 'border-brand-400 bg-brand-500/15 text-brand-700 dark:text-brand-300 shadow-glow'
                  : 'border-ink-200 dark:border-white/10 text-ink-500 dark:text-ink-300 hover:border-brand-300',
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-400">Max Price</p>
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{inr(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={100}
          max={150000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-400">Min Rating</p>
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{minRating.toFixed(1)}★</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-400">Max Delivery</p>
          <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{maxDelivery}d</span>
        </div>
        <input
          type="range"
          min={1}
          max={7}
          step={1}
          value={maxDelivery}
          onChange={(e) => setMaxDelivery(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
      </div>

      <button onClick={resetFilters} className="btn-ghost w-full text-sm">
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="pt-28">
      <Confetti fire={confettiKey} />
      <div className="section">
        <div className="mb-6">
          <p className="text-sm text-ink-400">
            {results.length > 0
              ? `Showing ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`
              : 'No matches'}
            {query && <> for <span className="font-semibold text-ink-700 dark:text-ink-200"> “{query}”</span></>}
          </p>
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : results.length === 0 ? (
          <EmptyState query={query} />
        ) : filtered.length === 0 ? (
          <EmptyFilteredState onReset={resetFilters} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <div className="card sticky top-28 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Filter size={16} className="text-brand-500" />
                  <p className="font-display font-bold">Filters</p>
                </div>
                {FilterPanel}
              </div>
            </aside>

            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-ink-400" />
                  <span className="text-sm font-semibold text-ink-600 dark:text-ink-300">Sort by</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SORTS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSort(s.key)}
                      className={cn(
                        'chip border transition-all duration-300 active:scale-95',
                        sort === s.key
                          ? 'border-brand-400 bg-brand-500/15 text-brand-700 dark:text-brand-300 shadow-glow'
                          : 'border-ink-200 dark:border-white/10 text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-white/5',
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="chip border border-brand-400 bg-brand-500/15 text-brand-700 dark:text-brand-300 lg:hidden"
                  >
                    <Filter size={12} /> Filters
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={cn(
                      'rounded-3xl transition-all duration-300',
                      selected?.id === p.id
                        ? 'ring-2 ring-brand-400 ring-offset-2 ring-offset-ink-50 dark:ring-offset-ink-950 scale-[1.01]'
                        : '',
                    )}
                  >
                    <ProductCard product={p} index={i} />
                  </div>
                ))}
              </div>

              {selected && analytics && (
                <div className="mt-10 space-y-6">
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <BarChart3 size={18} className="text-brand-500" />
                      <h3 className="font-display text-lg font-bold">
                        Price Analytics · <span className="text-brand-600 dark:text-brand-400">{selected.name}</span>
                      </h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="card p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-ink-400">Average Price</p>
                        <p className="mt-1 font-display text-2xl font-extrabold">
                          <AnimatedCounter value={Math.round(analytics.avg)} prefix="₹" />
                        </p>
                        <div className="mt-4">
                          <PriceRangeChart
                            prices={selected.offers.map((o) => o.price)}
                            best={bestOffer(selected).price}
                          />
                        </div>
                      </div>
                      <div className="card p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-ink-400">Price Trend (7 days)</p>
                        <div className="mt-4">
                          <LineChart data={priceHistory} height={170} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Stat label="Lowest" value={inr(analytics.min)} tone="brand" />
                        <Stat label="Highest" value={inr(analytics.max)} tone="accent" />
                        <Stat label="Difference" value={inr(analytics.diff)} tone="ink" />
                        <Stat label="You Save" value={inr(analytics.savings)} tone="brand" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 font-display text-lg font-bold">Price Comparison</h3>
                    <ComparisonTable product={selected} />
                  </div>

                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <BrainCircuit size={18} className="text-brand-500" />
                      <h3 className="font-display text-lg font-bold">AI Recommendation</h3>
                    </div>
                    <AIRecommendation product={selected} onCelebrate={celebrateBestDeal} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="glass-strong absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl p-6 animate-fade-up">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg font-bold">Filters</p>
              <button onClick={() => setShowFilters(false)} className="rounded-full p-2 hover:bg-ink-100 dark:hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            {FilterPanel}
            <button onClick={() => setShowFilters(false)} className="btn-primary mt-6 w-full">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'brand' | 'accent' | 'ink' }) {
  const color =
    tone === 'brand'
      ? 'text-brand-600 dark:text-brand-400'
      : tone === 'accent'
        ? 'text-accent-500'
        : 'text-ink-700 dark:text-ink-200';
  return (
    <div className="card p-4 transition-transform hover:scale-105">
      <p className="text-xs font-bold uppercase tracking-widest text-ink-400">{label}</p>
      <p className={cn('mt-1 font-display text-xl font-extrabold', color)}>{value}</p>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="card mx-auto max-w-lg p-12 text-center animate-fade-up">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
        <SearchX size={30} />
      </span>
      <p className="mt-5 font-display text-xl font-bold">No products found</p>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
        We couldn't find anything for “{query}”. Try a different search term.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {['iPhone', 'Lakme', 'Nike', 'Boat'].map((t) => (
          <button
            key={t}
            onClick={() => navigate({ name: 'search', query: t })}
            className="chip glass border border-brand-400/30 text-brand-700 transition hover:bg-brand-500/10 dark:text-brand-300"
          >
            <Sparkles size={12} /> {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyFilteredState({ onReset }: { onReset: () => void }) {
  return (
    <div className="card mx-auto max-w-lg p-12 text-center animate-fade-up">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500">
        <Filter size={30} />
      </span>
      <p className="mt-5 font-display text-xl font-bold">No matches for your filters</p>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
        Try widening your price range or clearing some filters.
      </p>
      <button onClick={onReset} className="btn-primary mt-5">
        Reset filters
      </button>
    </div>
  );
}
