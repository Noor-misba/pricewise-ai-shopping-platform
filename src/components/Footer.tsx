import { useState } from 'react';
import { Github, Instagram, Linkedin, Send, Sparkles, Twitter } from 'lucide-react';
import { navigate } from '../router';

const LINKS = {
  Product: [
    { label: 'Compare Prices', route: { name: 'search', query: '' } as const },
    { label: 'Best Deals', route: { name: 'search', query: '' } as const },
    { label: 'Price Analytics', route: { name: 'search', query: '' } as const },
    { label: 'Wishlist', route: { name: 'wishlist' } as const },
  ],
  Company: [
    { label: 'About Us', route: { name: 'about' } as const },
    { label: 'Contact', route: { name: 'contact' } as const },
    { label: 'Careers', route: { name: 'about' } as const },
    { label: 'Login', route: { name: 'login' } as const },
  ],
};

const SOCIALS = [Twitter, Instagram, Github, Linkedin];

export function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative mt-24 border-t border-ink-200/60 dark:border-white/10">
      <div className="section py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                <Sparkles size={18} />
              </span>
              <p className="font-display text-xl font-extrabold tracking-tight">
                PriceWise <span className="text-gradient">AI</span>
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              The smart shopping comparison platform that helps you find the best price across
              supported stores before you buy — powered by AI recommendations and real-time
              price analytics.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((Icon, i) => (
                <button
                  key={i}
                  className="rounded-full border border-ink-200 p-2.5 text-ink-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-ink-300"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-400">
                {title}
              </p>
              <ul className="space-y-2.5">
                {items.map((it) => (
                  <li key={it.label}>
                    <button
                      onClick={() => navigate(it.route)}
                      className="text-sm text-ink-600 transition hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-300"
                    >
                      {it.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-400">
              Newsletter
            </p>
            <p className="mb-3 text-sm text-ink-500 dark:text-ink-400">
              Get the best deals in your inbox weekly.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  setSent(true);
                  setEmail('');
                  setTimeout(() => setSent(false), 2500);
                }
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="input py-2.5 text-sm"
              />
              <button type="submit" className="btn-primary px-4 py-2.5" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
            {sent && (
              <p className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400 animate-fade-up">
                Subscribed! Watch your inbox.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200/60 pt-6 text-xs text-ink-400 dark:border-white/10 sm:flex-row">
          <p>© {new Date().getFullYear()} PriceWise AI. All rights reserved.</p>
          <div className="flex gap-5">
            <button className="hover:text-brand-600 dark:hover:text-brand-400">Privacy Policy</button>
            <button className="hover:text-brand-600 dark:hover:text-brand-400">Terms</button>
            <button className="hover:text-brand-600 dark:hover:text-brand-400">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
