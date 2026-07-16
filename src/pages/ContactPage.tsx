import { useState } from 'react';
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';

const FAQ = [
  { q: 'How does PriceWise AI find the best price?', a: 'We compare live listings across 8 supported stores and rank them by price, rating, and delivery speed. Our AI then recommends the smartest single store to buy from.' },
  { q: 'Is PriceWise AI free to use?', a: 'Yes — searching, comparing, and AI recommendations are completely free. You only pay the store when you decide to buy.' },
  { q: 'Which stores are supported?', a: 'Amazon, Flipkart, Myntra, Croma, Meesho, Nykaa, Tata CLiQ, and Ajio — with more being added regularly.' },
  { q: 'Does PriceWise sell products directly?', a: 'No. We redirect you to the store’s official listing to complete your purchase safely.' },
];

const SOCIALS = [Mail, Phone, MapPin];

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-28">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip glass border border-brand-400/30 text-brand-700 dark:text-brand-300">
            <MessageSquare size={13} /> Get in touch
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            We’d love to <span className="text-gradient">hear from you</span>
          </h1>
          <p className="mt-4 text-ink-500 dark:text-ink-300">
            Questions, feedback, or partnership ideas? Drop us a line.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="card p-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setSent(false), 3000);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Name</label>
                  <input required placeholder="Your name" className="input" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Email</label>
                  <input required type="email" placeholder="you@email.com" className="input" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Subject</label>
                <input required placeholder="How can we help?" className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Message</label>
                <textarea required rows={5} placeholder="Tell us more..." className="input resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={16} /> Send Message
              </button>
              {sent && (
                <p className="text-center text-sm font-semibold text-brand-600 dark:text-brand-400 animate-fade-up">
                  Thanks! We’ll get back to you soon.
                </p>
              )}
            </form>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="card p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-400">Contact</p>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'hello@pricewise.ai' },
                  { icon: Phone, label: '+91 98765 43210' },
                  { icon: MapPin, label: 'Bengaluru, India' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      <Icon size={16} />
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-400">Follow</p>
              <div className="flex gap-2">
                {SOCIALS.map((Icon, i) => (
                  <button
                    key={i}
                    className="rounded-full border border-ink-200 p-2.5 text-ink-500 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:text-ink-300"
                    aria-label="Social"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-6 text-center font-display text-3xl font-extrabold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="card group p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold list-none">
                  {f.q}
                  <span className="text-brand-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
