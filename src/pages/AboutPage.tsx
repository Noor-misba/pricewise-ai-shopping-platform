import { BrainCircuit, Cpu, Eye, Rocket, Target } from 'lucide-react';

const TIMELINE = [
  { year: '2023', title: 'The Idea', text: 'Frustrated by manual price checks across tabs, our founders sketched PriceWise on a napkin.' },
  { year: '2024', title: 'First Store Integrations', text: 'Connected 4 leading stores with real-time price feeds and a blazing-fast search index.' },
  { year: '2025', title: 'AI Recommendation Engine', text: 'Launched the AI verdict that reads every offer and recommends the smartest store to buy from.' },
  { year: '2026', title: '50k+ Smart Shoppers', text: 'Crossed 50,000 active shoppers and unlocked over ₹4.2 Cr in cumulative savings.' },
];

const VALUES = [
  { icon: Target, title: 'Mission', text: 'Make every purchase a great deal by putting transparent price intelligence in every shopper’s pocket.' },
  { icon: Eye, title: 'Vision', text: 'A world where no one ever overpays — where the best price is one search away, for everyone.' },
  { icon: Cpu, title: 'Technology', text: 'React, TypeScript, Tailwind, and an AI ranking engine that balances price, rating, and delivery.' },
];

export function AboutPage() {
  return (
    <div className="pt-28">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip glass border border-brand-400/30 text-brand-700 dark:text-brand-300">
            <Rocket size={13} /> Our Story
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            We make every purchase a <span className="text-gradient">great deal</span>
          </h1>
          <p className="mt-4 text-ink-500 dark:text-ink-300">
            PriceWise AI was born from a simple frustration: comparing prices across stores meant
            juggling a dozen browser tabs. We built one beautiful place to see them all — and an AI
            that tells you exactly where to buy.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="card p-6 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{text}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <h2 className="mb-10 text-center font-display text-3xl font-extrabold tracking-tight">
            Our journey
          </h2>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-400 to-accent-400 sm:left-1/2" />
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={`relative flex gap-6 animate-fade-up ${
                    i % 2 === 0 ? 'sm:flex-row-reverse sm:text-right' : ''
                  }`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="hidden flex-1 sm:block" />
                  <div className="absolute left-4 top-1.5 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-brand-500 ring-4 ring-brand-400/20 sm:left-1/2" />
                  <div className="flex-1 pl-10 sm:pl-0">
                    <div className="card p-5">
                      <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                        {t.year}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold">{t.title}</h3>
                      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{t.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech */}
        <div className="mt-20">
          <div className="card relative overflow-hidden p-10 text-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-400/20 blur-3xl" />
            <BrainCircuit size={40} className="mx-auto text-brand-500" />
            <h2 className="mt-4 font-display text-2xl font-extrabold">Built with modern tech</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500 dark:text-ink-400">
              React · TypeScript · Tailwind CSS · Supabase · AI ranking engine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
