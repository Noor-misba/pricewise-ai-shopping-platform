import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Sparkles, User } from 'lucide-react';
import { navigate } from '../router';

export function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [show, setShow] = useState(false);

  return (
    <div className="pt-28">
      <div className="section">
        <div className="mx-auto max-w-md">
          <div className="card relative overflow-hidden p-8 animate-fade-up">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                  <Sparkles size={20} />
                </span>
                <p className="font-display text-xl font-extrabold tracking-tight">
                  PriceWise <span className="text-gradient">AI</span>
                </p>
              </div>

              <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                {mode === 'login'
                  ? 'Sign in to access your wishlist and saved deals.'
                  : 'Start saving on every purchase in seconds.'}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate({ name: 'home' });
                }}
                className="mt-6 space-y-4"
              >
                {mode === 'signup' && (
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input required placeholder="Your name" className="input pl-10" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input required type="email" placeholder="you@email.com" className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-400">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                    <input
                      required
                      type={show ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="input pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                      aria-label="Toggle password"
                    >
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink-400">
                <div className="h-px flex-1 bg-ink-200 dark:bg-white/10" />
                or
                <div className="h-px flex-1 bg-ink-200 dark:bg-white/10" />
              </div>

              <button
                onClick={() => navigate({ name: 'home' })}
                className="btn-ghost w-full"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                </svg>
                Continue with Google
              </button>

              <p className="mt-5 text-center text-sm text-ink-500 dark:text-ink-400">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="font-bold text-brand-600 dark:text-brand-400"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
