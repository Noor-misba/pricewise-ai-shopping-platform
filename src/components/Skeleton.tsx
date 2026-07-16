import { cn } from '../lib/utils';

export function SkeletonCard() {
  return (
    <div className="card overflow-hidden p-4">
      <div className="skeleton aspect-square rounded-2xl" />
      <div className="mt-4 flex items-center justify-between">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="skeleton h-4 w-14 rounded-full" />
      </div>
      <div className="skeleton mt-3 h-4 w-3/4 rounded-lg" />
      <div className="skeleton mt-2 h-3 w-1/3 rounded-lg" />
      <div className="mt-4 flex items-end justify-between">
        <div className="skeleton h-7 w-20 rounded-lg" />
        <div className="skeleton h-4 w-10 rounded-lg" />
      </div>
      <div className="skeleton mt-3 h-9 w-full rounded-full" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-2xl p-4">
      <div className="skeleton h-8 w-8 rounded-xl" />
      <div className="skeleton h-5 flex-1 rounded-lg" />
      <div className="skeleton h-5 w-24 rounded-lg" />
      <div className="skeleton h-5 w-16 rounded-lg" />
      <div className="skeleton h-9 w-20 rounded-full" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3 rounded-lg"
          style={{ width: `${i === lines - 1 ? 60 : 100}%` }}
        />
      ))}
    </div>
  );
}
