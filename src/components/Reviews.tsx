import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const API_URL: string = ((import.meta as any).env?.VITE_API_URL || '').replace(/\/$/, '');

interface Review {
  id: number;
  productId: string;
  productTitle: string;
  name: string;
  city?: string;
  rating?: number;
  comment: string;
  createdAt?: string;
  verified?: boolean;
}

interface ReviewData {
  count: number;
  average: number;
  reviews: Review[];
}

const Stars: React.FC<{ value: number; size?: string }> = ({ value, size = 'w-4 h-4' }) => (
  <span className="inline-flex gap-0.5" aria-label={value + ' out of 5 stars'}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} className={size + (n <= Math.round(value) ? ' fill-[#eb3324] text-[#eb3324]' : ' text-black/20 dark:text-white/20')} />
    ))}
  </span>
);

const useReviews = (productId?: string, reloadKey = 0) => {
  const [data, setData] = useState<ReviewData | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(API_URL + '/api/reviews' + (productId ? '?product=' + encodeURIComponent(productId) : ''))
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && d && setData({ ...d, reviews: d.reviews.map((r: Review) => ({ ...r, verified: true })) }))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [productId, reloadKey]);
  return data;
};

const ReviewCard: React.FC<{ r: Review; showProduct?: boolean }> = ({ r, showProduct }) => (
  <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
    {r.rating ? <Stars value={r.rating} /> : null}
    <p className={'text-sm leading-relaxed opacity-90' + (r.rating ? ' mt-3' : '')}>{r.comment}</p>
    <div className="mt-4 text-xs font-mono">
      <span className="font-bold">{r.name}</span>
      {r.city && <span className="opacity-60">, {r.city}</span>}
      <span className="ml-2 px-1.5 py-0.5 rounded bg-[#eb3324]/10 text-[#eb3324] font-bold">
        {r.verified ? 'Verified buyer' : 'Customer'}
      </span>
    </div>
    {showProduct && <div className="mt-2 text-[11px] font-mono opacity-60">{r.productTitle}</div>}
  </div>
);

// Reviews shown at the bottom of the shop page. Hidden until there is at least one approved review.
export const HomeReviews: React.FC = () => {
  const data = useReviews();
  const items: Review[] = [
    ...testimonials.map((t) => ({ ...t, id: t.id as unknown as number })),
    ...(data ? data.reviews : []),
  ];
  if (items.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-black">What customers say</h2>
        {data && data.count > 0 && (
          <div className="flex items-center gap-2 text-sm font-mono">
            <Stars value={data.average} />
            <span className="font-bold">{data.average.toFixed(1)}</span>
            <span className="opacity-60">({data.count})</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 6).map((r) => (
          <ReviewCard key={r.id} r={r} showProduct />
        ))}
      </div>
    </section>
  );
};

// Reviews and the "write a review" form on a product page
export const ProductReviews: React.FC<{ productId: string }> = ({ productId }) => {
  const [reloadKey, setReloadKey] = useState(0);
  const data = useReviews(productId, reloadKey);
  const items: Review[] = [
    ...testimonials.filter((t) => t.productId === productId).map((t) => ({ ...t, id: t.id as unknown as number })),
    ...(data ? data.reviews : []),
  ];
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ orderId: '', phone: '', rating: 5, comment: '' });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const field =
    'w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(API_URL + '/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productId }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Could not send your review.');
      setMsg({ ok: true, text: d.message });
      setForm({ orderId: '', phone: '', rating: 5, comment: '' });
      setOpen(false);
      setReloadKey((k) => k + 1);
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : 'Could not send your review.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-2xl font-black">Customer reviews</h2>
          {data && data.count > 0 ? (
            <div className="flex items-center gap-2 mt-1 text-sm font-mono">
              <Stars value={data.average} />
              <span className="font-bold">{data.average.toFixed(1)}</span>
              <span className="opacity-60">({data.count} {data.count === 1 ? 'review' : 'reviews'})</span>
            </div>
          ) : (
            <p className="text-xs font-mono opacity-60 mt-1">
              {items.length > 0 ? 'What customers say about this product' : 'No reviews yet. Be the first once you have received your order.'}
            </p>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="px-5 py-2.5 rounded-xl border-2 border-[#eb3324] text-[#eb3324] hover:bg-[#eb3324] hover:text-white text-xs font-mono font-bold transition-all"
        >
          {open ? 'Cancel' : 'Write a review'}
        </button>
      </div>

      {msg && (
        <p className={'text-sm mb-4 ' + (msg.ok ? 'text-green-600 dark:text-green-400' : 'text-[#eb3324]')}>{msg.text}</p>
      )}

      {open && (
        <form onSubmit={submit} className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8 space-y-3 max-w-xl">
          <p className="text-xs font-mono opacity-70">
            Only customers can review. Enter the order number you received when you ordered and the phone number you used. Reviews appear after approval.
          </p>
          <input required placeholder="Order number (for example HX-1001)" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} className={field} />
          <input required type="tel" placeholder="Phone number used for the order" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })} aria-label={n + ' stars'}>
                <Star className={'w-7 h-7 ' + (n <= form.rating ? 'fill-[#eb3324] text-[#eb3324]' : 'text-black/25 dark:text-white/25')} />
              </button>
            ))}
          </div>
          <textarea required minLength={5} maxLength={600} rows={4} placeholder="Tell us about the product" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className={field} />
          <button disabled={busy} className="px-6 py-3 rounded-xl bg-[#eb3324] hover:bg-[#c41d10] text-white text-xs font-mono font-bold disabled:opacity-50">
            {busy ? 'Sending...' : 'Submit review'}
          </button>
        </form>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
};
