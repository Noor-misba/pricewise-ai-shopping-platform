import { useMemo } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  IndianRupee,
  Package,
  ShoppingCart,
  TrendingDown,
  Trophy,
} from 'lucide-react';
import { PRODUCTS, STORES, bestOffer } from '../data/products';
import { navigate } from '../router';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { LineChart } from '../components/LineChart';
import { DonutChart } from '../components/DonutChart';
import { MiniBarChart } from '../components/MiniBarChart';
import { inr, avg, cn } from '../lib/utils';

export function DashboardPage() {
  const stats = useMemo(() => {
    const allOffers = PRODUCTS.flatMap((p) => p.offers);
    const prices = allOffers.map((o) => o.price);
    const totalSavings = allOffers.reduce((a, o) => a + (o.mrp - o.price), 0);
    return {
      products: PRODUCTS.length,
      stores: STORES.length,
      avgPrice: Math.round(avg(prices)),
      totalSavings: Math.round(totalSavings),
      bestDeals: PRODUCTS.filter((p) => {
        const o = bestOffer(p);
        return (o.mrp - o.price) / o.mrp > 0.4;
      }).length,
    };
  }, []);

  const priceHistory = useMemo(() => {
    const base = 98000;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((d, i) => ({
      label: d,
      value: Math.round(base + Math.sin(i * 1.2) * 4000 + (Math.random() - 0.5) * 2000),
    }));
  }, []);

  const storeDistribution = useMemo(
    () =>
      STORES.slice(0, 5).map((s) => ({
        label: s.name,
        value: PRODUCTS.filter((p) => p.offers.some((o) => o.store === s.name)).length,
        color: s.color,
      })),
    [],
  );

  const topDeals = useMemo(
    () =>
      [...PRODUCTS]
        .map((p) => {
          const o = bestOffer(p);
          const off = Math.round(((o.mrp - o.price) / o.mrp) * 100);
          return { product: p, offer: o, off };
        })
        .sort((a, b) => b.off - a.off)
        .slice(0, 5),
    [],
  );

  const statCards = [
    { icon: Package, label: 'Products Tracked', value: stats.products, suffix: '+', tone: 'brand' },
    { icon: ShoppingCart, label: 'Stores Compared', value: stats.stores, tone: 'accent' },
    { icon: IndianRupee, label: 'Avg. Price', value: stats.avgPrice, prefix: '₹', tone: 'brand' },
    { icon: TrendingDown, label: 'Total Savings', value: stats.totalSavings, prefix: '₹', suffix: '+', tone: 'accent' },
  ];

  return (
    <div className="pt-28">
      <div className="section">
        <div className="mb-8">
          <span className="chip glass border border-brand-400/30 text-brand-700 dark:text-brand-300">
            <BarChart3 size={13} /> Price Analytics Dashboard
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Shopping <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Real-time price analytics across all tracked products and stores.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((s, i) => (
            <div
              key={s.label}
              className="card group relative overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-glow transition-transform group-hover:scale-110',
                    s.tone === 'brand'
                      ? 'bg-gradient-to-br from-brand-500 to-brand-700'
                      : 'bg-gradient-to-br from-accent-400 to-accent-600',
                  )}
                >
                  <s.icon size={20} />
                </span>
                <ArrowUpRight size={18} className="text-ink-300 transition group-hover:text-brand-500" />
              </div>
              <p className="mt-4 font-display text-3xl font-extrabold">
                <AnimatedCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </p>
              <p className="mt-0.5 text-xs font-medium text-ink-500 dark:text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="card p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold">Price Trend</h3>
                <p className="text-xs text-ink-400">Avg. price across stores (last 7 days)</p>
              </div>
              <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                <TrendingDown size={12} /> -3.2% this week
              </span>
            </div>
            <LineChart data={priceHistory} height={220} />
          </div>

          <div className="card p-6">
            <h3 className="mb-4 font-display font-bold">Store Distribution</h3>
            <DonutChart
              segments={storeDistribution}
              centerValue={String(stats.stores)}
              centerLabel="Stores"
            />
          </div>
        </div>

        {/* Top deals + bar chart */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-4 font-display font-bold">Top Deals Right Now</h3>
            <div className="space-y-3">
              {topDeals.map(({ product, offer, off }, i) => (
                <button
                  key={product.id}
                  onClick={() => navigate({ name: 'product', id: product.id })}
                  className="flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition hover:bg-ink-50 dark:hover:bg-white/5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-xs font-bold text-brand-600 dark:text-brand-400">
                    {i + 1}
                  </span>
                  <img src={product.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{product.name}</p>
                    <p className="text-xs text-ink-400">{offer.store} · {inr(offer.price)}</p>
                  </div>
                  <span className="chip bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
                    {off}% OFF
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="mb-4 font-display font-bold">Avg. Price by Store</h3>
            <MiniBarChart
              data={STORES.slice(0, 6).map((s) => ({
                label: s.name.split(' ')[0],
                value: Math.round(
                  avg(
                    PRODUCTS.filter((p) => p.offers.some((o) => o.store === s.name)).flatMap((p) =>
                      p.offers.filter((o) => o.store === s.name).map((o) => o.price / 1000),
                    ),
                  ),
                ),
              }))}
              height={200}
            />
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-500/10 p-3">
              <Trophy size={16} className="text-brand-500" />
              <p className="text-xs font-medium text-ink-600 dark:text-ink-300">
                Amazon consistently offers the lowest average prices across categories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
