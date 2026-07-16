export const inr = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const discountPct = (price: number, mrp: number) =>
  Math.max(0, Math.round(((mrp - price) / mrp) * 100));

export const avg = (nums: number[]) =>
  nums.reduce((a, b) => a + b, 0) / (nums.length || 1);

export const cn = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');
