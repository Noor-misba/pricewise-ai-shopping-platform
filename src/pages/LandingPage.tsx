import { ArrowRight, BarChart3, BrainCircuit, HeartHandshake, Sparkles, Star, TrendingDown, Wallet, Zap } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { navigate } from '../router';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { inr } from '../lib/utils';

const BRANDS = ['Amazon', 'Flipkart', 'Myntra', 'Croma', 'Meesho', 'Nykaa', 'Tata CLiQ', 'Ajio'];

const FEATURES = [
  { icon: TrendingDown, title: 'Compare Prices', text: 'See live prices across 8 supported stores side-by-side in one beautiful view.' },
  { icon: Wallet, title: 'Save Money', text: 'Our AI surfaces the cheapest listing so you never overpay again.' },
  { icon: BrainCircuit, title: 'AI Recommendations', text: 'Get a human-readable verdict on the smartest store to buy from right now.' },
  { icon: Zap, title: 'Fast Search', text: 'Type a product and get instant, intelligent suggestions as you go.' },
  { icon: BarChart3, title: 'Price Analytics', text: 'Visual dashboards reveal the average, lowest, and highest prices at a glance.' },
  { icon: HeartHandshake, title: 'Wishlist', text: 'Save products you love and track them all in your personal wishlist.' },
];

const STATS = [
  { value: '8', label: 'Stores Compared' },
  { value: '12k+', label: 'Products Tracked' },
  { value: '₹4.2Cr', label: 'Savings Unlocked' },
  { value: '98%', label: 'Deal Accuracy' },
];

export function LandingPage() {
  const trending = PRODUCTS.slice(0, 4);

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-[size:44px_44px] opacity-60 dark:bg-grid-dark" />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-400/20 blur-[120px]" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="chip glass border border-brand-400/30 text-brand-700 dark:text-brand-300">
              <Sparkles size={13} /> AI-Powered Price Intelligence
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Find the <span className="text-gradient">Best Price</span><br /> Before You Buy
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500 dark:text-ink-300">
              Compare prices across supported stores and discover the smartest deal in seconds.
              Let AI do the bargain hunting for you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => navigate({ name: 'search', query: '' })} className="btn-primary">
                Compare Now <ArrowRight size={17} />
              </button>
              <button onClick={() => navigate({ name: 'search', query: '' })} className="btn-ghost">
                Explore Deals
              </button>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex -space-x-2">
                {['#14b3ad', '#fb5c11', '#0c908b', '#ff7c38'].map((c, i) => (
                  <span
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-white dark:border-ink-950"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-accent-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs font-medium text-ink-500 dark:text-ink-400">
                  Loved by 50k+ smart shoppers
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-up animate-delay-200">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-400/30 to-accent-400/30 blur-2xl" />
              <div className="card relative overflow-hidden p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                      PriceWise AI
                    </p>
                    <p className="font-display text-lg font-bold">iPhone 16 Pro</p>
                  </div>
                  <span className="chip bg-brand-500 text-white shadow-glow">
                    <TrendingDown size={12} /> ₹1,200 off
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    { store: 'Amazon', price: 134900, best: true },
                    { store: 'Flipkart', price: 136100, best: false },
                    { store: 'Croma', price: 137300, best: false },
                  ].map((r) => (
                    <div
                      key={r.store}
                      className={`flex items-center justify-between rounded-2xl border p-3 transition ${
                        r.best
                          ? 'border-brand-400/50 bg-brand-500/10 shadow-glow'
                          : 'border-ink-100 dark:border-white/5'
                      }`}
                    >
                      <span className="text-sm font-semibold">{r.store}</span>
                      <span className="font-display font-bold">{inr(r.price)}</span>
                      {r.best && (
                        <span className="chip bg-brand-500 text-white text-[10px]">Best</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    <BrainCircuit size={13} /> AI Verdict
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed">
                    Buy from <span className="font-bold">Amazon</span> — lowest price & fastest delivery.
                  </p>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 hidden animate-float rounded-2xl glass-strong p-3 shadow-glow sm:block">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-500 text-white">
                    <Zap size={16} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Savings</p>
                    <p className="text-sm font-extrabold text-brand-600 dark:text-brand-400">₹2,400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating search */}
        <div className="mx-auto mt-14 max-w-2xl animate-fade-up animate-delay-300">
          <SearchBar large />
        </div>
      </section>

      {/* Brand marquee */}
      <section className="mt-20 overflow-hidden py-6">
        <p className="section mb-4 text-center text-xs font-bold uppercase tracking-widest text-ink-400">
          Comparing prices across your favorite stores
        </p>
        <div className="relative flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={i}
                className="font-display text-2xl font-extrabold text-ink-300 dark:text-ink-700"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden>
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={i}
                className="font-display text-2xl font-extrabold text-ink-300 dark:text-ink-700"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section mt-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <p className="font-display text-3xl font-extrabold text-gradient">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-ink-500 dark:text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip glass border border-brand-400/30 text-brand-700 dark:text-brand-300">
            <Star size={13} /> Why PriceWise
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to shop smarter
          </h2>
          <p className="mt-3 text-ink-500 dark:text-ink-300">
            Powerful features designed to make every purchase a great deal.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="card group p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow transition-transform group-hover:scale-110">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending products */}
      <section className="section mt-24">
        <div className="flex items-end justify-between">
          <div>
            <span className="chip glass border border-accent-400/30 text-accent-700 dark:text-accent-300">
              <TrendingDown size={13} /> Trending Now
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hot deals this week
            </h2>
          </div>
          <button
            onClick={() => navigate({ name: 'search', query: '' })}
            className="btn-ghost hidden text-sm sm:inline-flex"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section mt-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-400/30 bg-gradient-to-br from-brand-500/15 via-accent-500/10 to-brand-500/15 p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent-400/30 blur-3xl" />
          <div className="relative">
            <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
              <Sparkles size={26} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start saving on every purchase
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-500 dark:text-ink-300">
              Join thousands of smart shoppers who never pay more than they should.
            </p>
            <button
              onClick={() => navigate({ name: 'search', query: '' })}
              className="btn-primary mt-7"
            >
              Compare Prices Now <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
