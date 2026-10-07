import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { formatPrice, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '../utils/currency';

import { API_URL } from '../utils/api';

export const BagDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    totalCartCount,
    checkoutIntent,
    setCheckoutIntent
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
  const setField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (isCartOpen && checkoutIntent) {
      setShowForm(true);
      setCheckoutIntent(false);
    }
  }, [isCartOpen, checkoutIntent]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const progressToFree = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HASHTAGSX' || promoCode.trim().toUpperCase() === 'HX10') {
      sound.playSuccess();
      setDiscountPercent(15);
      setPromoError('');
    } else {
      sound.playClick();
      setPromoError('Invalid promo code. Try "HASHTAGSX"');
    }
  };

  const shippingCost = remainingForFree <= 0 ? 0 : SHIPPING_FEE;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');
    setCheckingOut(true);
    try {
      const res = await fetch(API_URL + '/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: cart.map((i) => ({
            id: i.product.id,
            title: i.product.title,
            size: i.size,
            color: i.color || '',
            quantity: i.quantity,
            price: i.product.price,
          })),
          subtotal: cartSubtotal,
          discount: discountAmount,
          shipping: shippingCost,
          total: finalTotal + shippingCost,
        }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || !data.id) throw new Error(data.error || 'We could not place your order right now. Please try again in a moment.');
      sound.playSuccess();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#eb3324', '#000000', '#ffffff'] });
      } catch {}
      clearCart();
      setShowForm(false);
      setIsCartOpen(false);
      alert('Order ' + data.id + ' placed! We will contact you on ' + form.phone + ' to confirm. Payment: cash on delivery.');
    } catch (err) {
      setOrderError(
        err instanceof Error && !/fetch|network|load failed/i.test(err.message)
          ? err.message
          : 'We could not reach the store server. Check your connection and try again.'
      );
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          sound.playClick();
          setIsCartOpen(false);
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream dark:bg-[#121214] text-black dark:text-cream border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between">
          
          <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#eb3324]" />
              <h2 className="font-heading font-black text-xl tracking-tight uppercase">
                Your Bag
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#eb3324] text-white font-bold">
                {totalCartCount}
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setIsCartOpen(false);
              }}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-3 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
              <span>
                {remainingForFree > 0
                  ? 'Add ' + formatPrice(remainingForFree) + ' more for Free Shipping'
                  : '✨ You unlocked Free Shipping!'}
              </span>
              <span className="font-bold text-[#eb3324]">{Math.round(progressToFree)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#eb3324] transition-all duration-500 rounded-full"
                style={{ width: progressToFree + '%' }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {cart.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#eb3324]/10 flex items-center justify-center text-[#eb3324] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-heading font-bold text-lg mb-1">Your bag is empty</p>
                <p className="text-xs font-mono opacity-60 mb-6 max-w-xs">
                  Explore our signature collection to add pieces.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#eb3324] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#c41d10] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={item.product.id + '-' + item.size + '-' + (item.color || '') + '-' + idx}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-20 object-cover rounded-xl bg-black/5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm truncate">{item.product.title}</h4>
                    <div className="flex items-center gap-2 text-xs font-mono opacity-70 my-1">
                      <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold">
                        {item.color ? item.color + ' / ' : ''}{item.size}
                      </span>
                      <span>{formatPrice(item.product.price)} each</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-black/15 dark:border-white/15 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1, item.color)}
                          className="px-2 py-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1, item.color)}
                          className="px-2 py-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="text-[#eb3324] hover:text-black p-1 opacity-70 hover:opacity-100 transition-opacity ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-4 max-h-[60vh] overflow-y-auto">
              
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (Try HASHTAGSX)"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#eb3324]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-xl bg-black text-white hover:bg-[#eb3324] text-xs font-mono font-bold transition-colors"
                >
                  Apply
                </button>
              </form>
              {discountPercent > 0 && (
                <div className="text-[11px] font-mono text-[#eb3324] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {discountPercent}% discount applied!
                </div>
              )}
              {promoError && <div className="text-[11px] font-mono text-[#eb3324]">{promoError}</div>}

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between opacity-70">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#eb3324] font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between opacity-70">
                  <span>Estimated Shipping</span>
                  <span>{remainingForFree <= 0 ? 'FREE' : formatPrice(SHIPPING_FEE)}</span>
                </div>
                <div className="flex justify-between text-base font-bold font-heading pt-2 border-t border-black/10 dark:border-white/10">
                  <span>Total</span>
                  <span className="font-mono text-[#eb3324]">
                    {formatPrice(finalTotal + shippingCost)}
                  </span>
                </div>
              </div>

              {!showForm ? (
                <button
                  onClick={() => { sound.playClick(); setShowForm(true); }}
                  className="w-full py-4 rounded-2xl bg-[#eb3324] hover:bg-[#c41d10] text-white font-mono text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-2">
                  <button type="button" onClick={() => setShowForm(false)} className="text-[11px] font-mono underline opacity-60">Back to bag</button>
                  <input required placeholder="Full name" value={form.name} onChange={(e) => setField('name', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]" />
                  <input required type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setField('phone', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]" />
                  <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setField('email', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]" />
                  <input required placeholder="Delivery address" value={form.address} onChange={(e) => setField('address', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]" />
                  <input required placeholder="City" value={form.city} onChange={(e) => setField('city', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]" />
                  <input placeholder="Notes (optional)" value={form.notes} onChange={(e) => setField('notes', e.target.value)} className="w-full px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-[#eb3324]" />
                  <p className="text-[11px] opacity-60 font-mono">Payment: cash on delivery</p>
                  {orderError && <p className="text-xs text-[#eb3324]">{orderError}</p>}
                  <button
                    type="submit"
                    disabled={checkingOut}
                    className="sticky bottom-0 w-full py-4 rounded-2xl bg-[#eb3324] hover:bg-[#c41d10] text-white font-mono text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 disabled:opacity-50"
                  >
                    {checkingOut ? <span>Placing Order...</span> : <span>Place Order</span>}
                  </button>
                </form>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
