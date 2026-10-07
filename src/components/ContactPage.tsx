import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { sound } from '../utils/sound';
import { API_URL } from '../utils/api';

export const ContactPage: React.FC = () => {
  const { setActiveProductModal } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '', website: '' });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    document.title = 'Contact | HASHTAGSX';
    return () => {
      document.title = 'HASHTAGSX® Store — Signature Apparel Collection';
    };
  }, []);

  const field =
    'w-full px-5 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email.trim() && !form.phone.trim()) {
      setError('Please enter an email or a phone number so we can reply.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(API_URL + '/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) throw new Error(data.error || 'We could not send your note right now. Please try again in a moment.');
      sound.playSuccess();
      setDone(true);
      setForm({ name: '', email: '', phone: '', comment: '', website: '' });
    } catch (err) {
      setError(
        err instanceof Error && !/fetch|network|load failed/i.test(err.message)
          ? err.message
          : 'We could not reach the store server. Check your connection and try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-14">
      <button
        onClick={() => {
          sound.playClick();
          setActiveProductModal(null);
        }}
        className="flex items-center gap-1.5 text-xs font-mono opacity-70 hover:text-[#eb3324] hover:opacity-100 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to shop</span>
      </button>

      <h1 className="font-heading text-4xl sm:text-5xl font-black text-center mb-3">Contact</h1>
      <p className="text-center text-sm opacity-70 mb-10">
        Questions about an order or a product? Send us a note and we will reply.
      </p>

      {done ? (
        <div className="p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
          <h2 className="font-heading text-2xl font-black mb-2">Thank you</h2>
          <p className="text-sm opacity-80 mb-6">We have received your note and will get back to you soon.</p>
          <button
            onClick={() => setDone(false)}
            className="px-6 py-3 rounded-xl border-2 border-[#eb3324] text-[#eb3324] hover:bg-[#eb3324] hover:text-white text-xs font-mono font-bold transition-all"
          >
            Send another note
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
          </div>
          <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
          <textarea
            required
            minLength={5}
            maxLength={2000}
            rows={8}
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className={field}
          />
          {/* hidden spam trap: people never see or fill this in */}
          <input
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="hidden"
          />
          <p className="text-[11px] font-mono opacity-60">Please give an email or a phone number so we can reply.</p>
          {error && <p className="text-sm text-[#eb3324]">{error}</p>}
          <button
            disabled={busy}
            className="px-8 py-4 rounded-xl bg-[#eb3324] hover:bg-[#c41d10] text-white text-sm font-mono font-bold disabled:opacity-50 transition-colors"
          >
            {busy ? 'Sending...' : 'Send us a note'}
          </button>
        </form>
      )}
    </section>
  );
};
