import { useEffect, useState } from 'react';
import { BarChart3, Heart, LayoutDashboard, Moon, Sparkles, Sun, Tag, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { navigate, type Route } from '../router';
import { SearchBar } from './SearchBar';
import { cn } from '../lib/utils';

const NAV: { label: string; route: Route; icon: typeof Tag }[] = [
  { label: 'Home', route: { name: 'home' }, icon: Sparkles },
  { label: 'Deals', route: { name: 'search', query: '' }, icon: Tag },
  { label: 'Dashboard', route: { name: 'dashboard' }, icon: BarChart3 },
  { label: 'About', route: { name: 'about' }, icon: LayoutDashboard },
  { label: 'Contact', route: { name: 'contact' }, icon: User },
];

export function Navbar({ route }: { route: Route }) {
  const { theme, toggle } = useTheme();
  const { ids } = useWishlist();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (r: Route) =>
    r.name === route.name ||
    (r.name === 'search' && route.name === 'search') ||
    (r.name === 'home' && route.name === 'home');

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="section">
        <div
          className={cn(
            'flex items-center gap-3 rounded-full px-4 transition-all duration-500',
            scrolled ? 'glass-strong shadow-soft dark:shadow-soft-dark py-2' : 'py-1.5',
          )}
        >
          <button
            onClick={() => navigate({ name: 'home' })}
            className="flex shrink-0 items-center gap-2.5 pr-2"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
              <Sparkles size={18} />
              <span className="absolute inset-0 rounded-2xl animate-pulse-ring border-2 border-brand-400" />
            </span>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-extrabold leading-none tracking-tight">
                PriceWise <span className="text-gradient">AI</span>
              </p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-ink-400">
                Smart Shopping
              </p>
            </div>
          </button>

          <div className="hidden flex-1 px-4 md:block">
            <SearchBar initial={route.name === 'search' ? route.query : ''} />
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ label, route: r, icon: Icon }) => (
              <button
                key={label}
                onClick={() => navigate(r)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all',
                  isActive(r)
                    ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300'
                    : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-white/5',
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigate({ name: 'dashboard' })}
              className="hidden rounded-full p-2.5 text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5 md:block"
              aria-label="Dashboard"
            >
              <BarChart3 size={18} />
            </button>
            <button
              onClick={() => navigate({ name: 'wishlist' })}
              className="relative rounded-full p-2.5 text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {ids.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                  {ids.length}
                </span>
              )}
            </button>
            <button
              onClick={toggle}
              className="rounded-full p-2.5 text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => navigate({ name: 'login' })}
              className="btn-primary px-4 py-2 text-sm"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="mt-2 px-1 md:hidden">
          <SearchBar initial={route.name === 'search' ? route.query : ''} />
        </div>
      </div>
    </header>
  );
}
