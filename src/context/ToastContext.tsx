import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastCtx {
  toast: (t: Omit<Toast, 'id'>) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = ++counter;
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => remove(id), 4000);
    },
    [remove],
  );

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'glass-strong pointer-events-auto flex items-start gap-3 rounded-2xl p-4 shadow-soft dark:shadow-soft-dark animate-fade-up',
            )}
          >
            <span
              className={cn(
                'mt-0.5 shrink-0',
                t.type === 'success' && 'text-brand-500',
                t.type === 'error' && 'text-accent-500',
                t.type === 'info' && 'text-blue-500',
              )}
            >
              {t.type === 'success' ? (
                <CheckCircle2 size={20} />
              ) : t.type === 'error' ? (
                <XCircle size={20} />
              ) : (
                <Info size={20} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">{t.title}</p>
              {t.message && (
                <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => remove(t.id)}
              className="shrink-0 rounded-full p-1 text-ink-400 hover:bg-ink-100 dark:hover:bg-white/10"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left animate-[shrink_4s_linear_forwards] rounded-full bg-brand-400/40" />
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.toast;
}
