import { BrainCircuit, Sparkles, TrendingDown, Wallet } from 'lucide-react';
import type { Product } from '../data/products';
import { bestOffer } from '../data/products';
import { inr } from '../lib/utils';
import { StoreBadge } from './StoreBadge';

export function AIRecommendation({
  product,
  onCelebrate,
}: {
  product: Product;
  onCelebrate?: () => void;
}) {
  const offers = [...product.offers].sort((a, b) => a.price - b.price);
  const best = bestOffer(product);
  const worst = offers[offers.length - 1];
  const savings = Math.round(worst.price - best.price);
  const savingsPct = Math.round((savings / worst.price) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-br from-brand-500/10 via-white/60 to-accent-500/10 p-6 dark:from-brand-500/15 dark:via-ink-900/60 dark:to-accent-500/10 shadow-glow animate-fade-up">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
            <BrainCircuit size={20} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              AI Recommendation
            </p>
            <p className="font-display text-lg font-bold">Smartest deal for you</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
          We recommend buying from{' '}
          <span className="font-bold text-brand-700 dark:text-brand-300">{best.store}</span>{' '}
          because it offers the{' '}
          <span className="font-semibold">lowest price</span>,{' '}
          <span className="font-semibold">{best.rating >= 4.4 ? 'excellent' : 'good'} ratings</span>
          , and the{' '}
          <span className="font-semibold">
            {best.deliveryDays <= 1 ? 'fastest' : 'fast'} delivery
          </span>
          .
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/70 p-3 dark:bg-white/5">
            <p className="flex items-center gap-1 text-xs text-ink-400">
              <TrendingDown size={12} /> You save
            </p>
            <p className="font-display text-xl font-extrabold text-brand-600 dark:text-brand-400">
              {inr(savings)}
            </p>
            <p className="text-[11px] font-semibold text-ink-400">~{savingsPct}% vs highest</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-3 dark:bg-white/5">
            <p className="flex items-center gap-1 text-xs text-ink-400">
              <Wallet size={12} /> Best price
            </p>
            <p className="font-display text-xl font-extrabold text-ink-900 dark:text-white">
              {inr(best.price)}
            </p>
            <p className="text-[11px] font-semibold text-ink-400">MRP {inr(best.mrp)}</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-white/70 p-3 dark:bg-white/5 sm:col-span-1">
            <p className="text-xs text-ink-400">Recommended store</p>
            <div className="mt-1.5">
              <StoreBadge store={best.store} size="sm" />
            </div>
          </div>
        </div>

        <a
          href={best.url}
          onClick={(e) => {
            e.preventDefault();
            onCelebrate?.();
          }}
          className="btn-primary mt-5 w-full"
        >
          <Sparkles size={16} /> Buy from {best.store} · {inr(best.price)}
        </a>
      </div>
    </div>
  );
}
