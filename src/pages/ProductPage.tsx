import { useState } from 'react';
import { ArrowLeft, Check, Heart, ShoppingBag, Truck } from 'lucide-react';
import { PRODUCTS, getProduct, bestOffer } from '../data/products';
import { navigate } from '../router';
import { useWishlist } from '../context/WishlistContext';
import { ComparisonTable } from '../components/ComparisonTable';
import { AIRecommendation } from '../components/AIRecommendation';
import { ProductCard } from '../components/ProductCard';
import { RatingStars } from '../components/RatingStars';
import { StoreBadge } from '../components/StoreBadge';
import { discountPct, inr } from '../lib/utils';

export function ProductPage({ id }: { id: string }) {
  const product = getProduct(id);
  const { has, toggle } = useWishlist();
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <div className="section pt-40">
        <div className="card mx-auto max-w-md p-12 text-center">
          <p className="font-display text-xl font-bold">Product not found</p>
          <button onClick={() => navigate({ name: 'search', query: '' })} className="btn-primary mt-5">
            Browse products
          </button>
        </div>
      </div>
    );
  }

  const offer = bestOffer(product);
  const off = discountPct(offer.price, offer.mrp);
  const fav = has(product.id);
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div className="pt-28">
      <div className="section">
        <button
          onClick={() => history.back()}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-300"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div className="animate-fade-up">
            <div className="card relative overflow-hidden p-3">
              {off > 0 && (
                <span className="absolute left-6 top-6 z-10 chip bg-accent-500 text-white shadow-glow-accent">
                  {off}% OFF
                </span>
              )}
              <img
                src={product.gallery[active]}
                alt={product.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-2xl border-2 transition ${
                    active === i ? 'border-brand-400' : 'border-transparent'
                  }`}
                >
                  <img src={g} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-up animate-delay-100">
            <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              {product.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-4">
              <RatingStars value={offer.rating} showValue size={16} />
              <span className="text-sm text-ink-400">·</span>
              <StoreBadge store={offer.store} size="sm" />
            </div>

            <div className="mt-5 flex items-end gap-3">
              <p className="font-display text-4xl font-extrabold text-gradient">{inr(offer.price)}</p>
              <p className="pb-1 text-lg text-ink-400 line-through">{inr(offer.mrp)}</p>
              {off > 0 && (
                <span className="chip bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
                  Save {inr(offer.mrp - offer.price)}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {product.description}
            </p>

            <div className="mt-5 flex items-center gap-3 text-sm font-medium text-ink-600 dark:text-ink-300">
              <span className="flex items-center gap-1.5">
                <Truck size={15} className="text-brand-500" /> {offer.deliveryDays} day delivery
              </span>
              <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
                <Check size={15} /> In stock
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <a href={offer.url} className="btn-primary flex-1">
                <ShoppingBag size={17} /> Buy from {offer.store}
              </a>
              <button
                onClick={() => toggle(product.id)}
                className={`btn-ghost px-5 ${fav ? 'text-accent-500' : ''}`}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={fav ? '#fb5c11' : 'none'} />
              </button>
            </div>

            {/* Specs */}
            <div className="card mt-6 p-5">
              <p className="mb-3 font-display font-bold">Specifications</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="border-b border-ink-100 pb-2 dark:border-white/5">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{k}</dt>
                    <dd className="text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Comparison + AI */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold">Price Comparison</h2>
            <ComparisonTable product={product} />
          </div>
          <div>
            <h2 className="mb-4 font-display text-xl font-bold">AI Recommendation</h2>
            <AIRecommendation product={product} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-xl font-bold">Related products</h2>
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
