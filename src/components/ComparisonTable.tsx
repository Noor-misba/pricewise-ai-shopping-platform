import { Check, Clock, ShoppingBag, Trophy, X } from 'lucide-react';
import type { Product, StoreOffer } from '../data/products';
import { inr, discountPct } from '../lib/utils';
import { StoreBadge } from './StoreBadge';
import { RatingStars } from './RatingStars';

export function ComparisonTable({ product }: { product: Product }) {
  const offers = [...product.offers].sort((a, b) => a.price - b.price);
  const best = offers[0];
  const highest = offers[offers.length - 1].price;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-ink-100 text-xs uppercase tracking-wider text-ink-400 dark:border-white/10">
              <th className="px-5 py-4 font-bold">Store</th>
              <th className="px-5 py-4 font-bold">Price</th>
              <th className="px-5 py-4 font-bold">Discount</th>
              <th className="px-5 py-4 font-bold">Rating</th>
              <th className="px-5 py-4 font-bold">Delivery</th>
              <th className="px-5 py-4 font-bold">Availability</th>
              <th className="px-5 py-4 font-bold">Savings</th>
              <th className="px-5 py-4 font-bold text-right">Buy</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o: StoreOffer) => {
              const isBest = o.store === best.store;
              const off = discountPct(o.price, o.mrp);
              const savings = Math.round(highest - o.price);
              return (
                <tr
                  key={o.store}
                  className={`border-b border-ink-100 transition-colors dark:border-white/5 ${
                    isBest
                      ? 'bg-brand-500/10 shadow-[inset_0_0_0_1px_rgba(20,179,173,0.35)]'
                      : 'hover:bg-ink-50 dark:hover:bg-white/5'
                  }`}
                >
                  <td className="px-5 py-4">
                    <StoreBadge store={o.store} size="sm" />
                    {isBest && (
                      <span className="mt-1.5 flex w-fit items-center gap-1 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-glow">
                        <Trophy size={11} /> Best Deal
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-display text-base font-extrabold">{inr(o.price)}</p>
                    <p className="text-xs text-ink-400 line-through">{inr(o.mrp)}</p>
                  </td>
                  <td className="px-5 py-4">
                    {off > 0 ? (
                      <span className="chip bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
                        {off}% OFF
                      </span>
                    ) : (
                      <span className="text-xs text-ink-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <RatingStars value={o.rating} showValue size={12} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm font-medium text-ink-600 dark:text-ink-300">
                      <Clock size={13} /> {o.deliveryDays} day{o.deliveryDays > 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {o.inStock ? (
                      <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                        <Check size={14} /> In stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm font-semibold text-ink-400">
                        <X size={14} /> Out of stock
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {savings > 0 ? (
                      <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                        {inr(savings)}
                      </span>
                    ) : (
                      <span className="text-xs text-ink-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a
                      href={o.url}
                      className={`btn ${
                        isBest
                          ? 'btn-primary text-sm'
                          : 'btn-ghost text-sm'
                      } px-4 py-2`}
                    >
                      <ShoppingBag size={14} /> Buy
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
