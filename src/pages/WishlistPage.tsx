import { Heart, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { navigate } from '../router';

export function WishlistPage() {
  const { ids, clear } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="pt-28">
      <div className="section">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="chip glass border border-accent-400/30 text-accent-700 dark:text-accent-300">
              <Heart size={13} /> Wishlist
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your saved deals
            </h1>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              {items.length} product{items.length !== 1 ? 's' : ''} you’re tracking.
            </p>
          </div>
          {items.length > 0 && (
            <button onClick={clear} className="btn-ghost text-sm">
              <Trash2 size={15} /> Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="card mx-auto max-w-md p-12 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500">
              <Heart size={26} />
            </span>
            <p className="mt-4 font-display text-xl font-bold">No saved products yet</p>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              Tap the heart on any product to save it here.
            </p>
            <button onClick={() => navigate({ name: 'search', query: '' })} className="btn-primary mt-5">
              Explore products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
