import { Heart, ShoppingBag, TrendingDown, Truck } from 'lucide-react';
import type { Product } from '../data/products';
import { bestOffer } from '../data/products';
import { navigate } from '../router';
import { useWishlist } from '../context/WishlistContext';
import { discountPct, inr } from '../lib/utils';
import { RatingStars } from './RatingStars';
import { StoreBadge } from './StoreBadge';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { has, toggle } = useWishlist();
  const offer = bestOffer(product);
  const fav = has(product.id);
  const off = discountPct(offer.price, offer.mrp);

  return (
    <div
      className="card group relative flex flex-col overflow-hidden p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      <button
        onClick={() => navigate({ name: 'product', id: product.id })}
        className="relative block aspect-square overflow-hidden rounded-2xl"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 chip bg-accent-500 text-white shadow-glow-accent">
            <TrendingDown size={12} /> {off}% OFF
          </span>
        )}
      </button>

      <button
        onClick={() => toggle(product.id)}
        className="absolute right-6 top-6 z-10 rounded-full bg-white/90 p-2 text-ink-600 shadow-soft backdrop-blur transition hover:scale-110 dark:bg-ink-900/80 dark:text-ink-200"
        aria-label="Toggle wishlist"
      >
        <Heart size={16} fill={fav ? '#fb5c11' : 'none'} className={fav ? 'text-accent-500' : ''} />
      </button>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            {product.category}
          </span>
          <RatingStars value={offer.rating} showValue size={12} />
        </div>
        <button
          onClick={() => navigate({ name: 'product', id: product.id })}
          className="mt-2 text-left text-sm font-bold leading-snug line-clamp-2 hover:text-brand-600 dark:hover:text-brand-300"
        >
          {product.name}
        </button>
        <p className="text-xs font-medium text-ink-400">{product.brand}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="font-display text-xl font-extrabold text-ink-900 dark:text-white">
              {inr(offer.price)}
            </p>
            <p className="text-xs text-ink-400 line-through">{inr(offer.mrp)}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-ink-500 dark:text-ink-300">
            <Truck size={13} /> {offer.deliveryDays}d
          </div>
        </div>

        <div className="mt-3 border-t border-ink-100 pt-3 dark:border-white/5">
          <StoreBadge store={offer.store} size="sm" />
        </div>

        <button
          onClick={() => navigate({ name: 'product', id: product.id })}
          className="btn-primary mt-3 w-full py-2.5 text-sm"
        >
          <ShoppingBag size={15} /> Compare & Buy
        </button>
      </div>
    </div>
  );
}
