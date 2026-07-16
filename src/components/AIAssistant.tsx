import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Lightbulb,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { PRODUCTS, bestOffer, searchProducts } from '../data/products';
import { navigate } from '../router';
import { useToast } from '../context/ToastContext';
import { inr, cn } from '../lib/utils';

interface Msg {
  role: 'ai' | 'user';
  text: string;
  productIds?: string[];
}

const QUICK = [
  'Find the cheapest iPhone',
  'Best lipstick deals',
  'Show me headphones under ₹3000',
  'Fastest delivery sneakers',
];

function generateReply(query: string): Msg {
  const results = searchProducts(query);
  if (results.length === 0) {
    return {
      role: 'ai',
      text: `I couldn't find anything for “${query}”. Try “iPhone”, “Lakme”, “Nike”, or “Boat earbuds”.`,
    };
  }
  const top = results.slice(0, 3);
  const best = top[0];
  const offer = bestOffer(best);
  return {
    role: 'ai',
    text: `I found ${results.length} match${results.length > 1 ? 'es' : ''}. The smartest pick is ${best.name} from ${offer.store} at ${inr(offer.price)} — that's the lowest price with ${offer.deliveryDays}-day delivery.`,
    productIds: top.map((p) => p.id),
  };
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'ai',
      text: "Hi! I'm your PriceWise AI shopping assistant. Ask me to find the best deal on any product and I'll compare prices across all stores for you.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, generateReply(q)]);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow transition-all duration-500 hover:scale-110',
          open && 'pointer-events-none scale-0 opacity-0',
        )}
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 rounded-2xl animate-pulse-ring border-2 border-brand-400" />
        <Bot size={26} />
      </button>

      {/* Panel */}
      <div
        className={cn(
          'fixed inset-0 z-[95] transition-all duration-500',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-500',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'glass-strong absolute right-0 top-0 flex h-full w-full max-w-md flex-col shadow-soft dark:shadow-soft-dark transition-transform duration-500',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink-100 p-5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                <Sparkles size={20} />
              </span>
              <div>
                <p className="font-display font-bold leading-none">PriceWise Assistant</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" /> Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-ink-400 hover:bg-ink-100 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn('flex gap-2.5', m.role === 'user' && 'flex-row-reverse')}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white',
                    m.role === 'ai'
                      ? 'bg-gradient-to-br from-brand-500 to-brand-700'
                      : 'bg-gradient-to-br from-accent-400 to-accent-600',
                  )}
                >
                  {m.role === 'ai' ? <Sparkles size={15} /> : <Bot size={15} />}
                </span>
                <div className={cn('max-w-[80%]', m.role === 'user' && 'text-right')}>
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      m.role === 'ai'
                        ? 'glass rounded-tl-sm'
                        : 'bg-brand-500 text-white rounded-tr-sm',
                    )}
                  >
                    {m.text}
                  </div>
                  {m.productIds && (
                    <div className="mt-2 space-y-2">
                      {m.productIds.map((pid) => {
                        const p = PRODUCTS.find((x) => x.id === pid)!;
                        const o = bestOffer(p);
                        return (
                          <button
                            key={pid}
                            onClick={() => {
                              setOpen(false);
                              navigate({ name: 'product', id: pid });
                            }}
                            className="glass flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition hover:ring-2 hover:ring-brand-400/40"
                          >
                            <img src={p.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-bold">{p.name}</p>
                              <p className="text-xs text-brand-600 dark:text-brand-400">
                                {inr(o.price)} · {o.store}
                              </p>
                            </div>
                            <ArrowRight size={14} className="text-ink-400" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Sparkles size={15} />
                </span>
                <div className="glass flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-brand-400"
                      style={{ animation: `float 0.8s ease-in-out ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick suggestions */}
          {messages.length <= 1 && (
            <div className="px-5 pb-2">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-400">
                <Lightbulb size={13} /> Try asking
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="chip glass border border-brand-400/30 text-brand-700 transition hover:bg-brand-500/10 dark:text-brand-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-ink-100 p-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Ask me to find a deal..."
                className="input flex-1 py-2.5"
              />
              <button
                onClick={() => {
                  send(input);
                  toast({ type: 'info', title: 'Searching stores...', message: 'Comparing prices across 8 stores.' });
                }}
                className="btn-primary px-4 py-2.5"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
