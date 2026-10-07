import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Plus, Minus, Check, Truck, Wallet } from 'lucide-react';
import { sound } from '../utils/sound';
import { formatPrice } from '../utils/currency';
import { ProductCard } from './ProductCard';

export const ProductPage: React.FC = () => {
  const { activeProductModal, setActiveProductModal, products, addToCart, buyNow, setIsShippingOpen } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = activeProductModal;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [product?.id]);

  if (!product) return null;

  const currentColor = selectedColor || product.colors?.[0] || undefined;
  const availableSizes = (currentColor && product.sizesByColor?.[currentColor]) || product.sizes;
  const currentSize = availableSizes.includes(selectedSize) ? selectedSize : availableSizes[0] || 'Standard';
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const pill = (active: boolean) =>
    'px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ' +
    (active
      ? 'bg-[#eb3324] text-white shadow-sm'
      : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10');

  const handleAddToCart = () => {
    addToCart(product, currentSize, quantity, currentColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex items-center gap-2 text-xs font-mono mb-6 opacity-70">
        <button
          onClick={() => {
            sound.playClick();
            setActiveProductModal(null);
          }}
          className="flex items-center gap-1.5 hover:text-[#eb3324] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to shop</span>
        </button>
        <span>/</span>
        <span>{product.category}</span>
        <span className="hidden sm:inline">/</span>
        <span className="hidden sm:inline truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-24 self-start">
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto no-scrollbar sm:max-h-[640px]">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playClick();
                    setSelectedImgIndex(i);
                  }}
                  className={'w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ' + (
                    selectedImgIndex === i
                      ? 'border-[#eb3324]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <img
              src={product.images[selectedImgIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-[#eb3324] font-bold tracking-widest uppercase mb-2">
            <span>{product.category}</span>
            {product.isNew && <span className="px-2.5 py-1 rounded-full bg-[#eb3324] text-white text-[10px]">New</span>}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-heading mb-3 leading-tight">{product.title}</h1>

          <div className="text-3xl font-mono font-bold mb-6 text-[#eb3324]">{formatPrice(product.price * 1)}</div>

          <p className="text-sm sm:text-base text-black/75 dark:text-cream/75 leading-relaxed mb-8">{product.description}</p>

          {product.colors && product.colors.length > 1 && (
            <div className="mb-6">
              <div className="text-xs font-mono uppercase mb-2.5">
                <span className="font-bold">Colour</span>
                <span className="opacity-60">: {currentColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      sound.playClick();
                      setSelectedColor(color);
                      const idx = product.colorImages?.[color];
                      if (idx !== undefined) setSelectedImgIndex(idx);
                    }}
                    className={pill(currentColor === color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableSizes.length > 0 && availableSizes[0] !== 'One Size' && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-mono uppercase mb-2.5">
                <span className="font-bold">Size</span>
                <button onClick={() => setIsShippingOpen(true)} className="text-[#eb3324] hover:underline">
                  Shipping &amp; returns
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      sound.playClick();
                      setSelectedSize(size);
                    }}
                    className={pill(currentSize === size) + ' min-w-[3.25rem]'}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-mono uppercase font-bold">Quantity</span>
            <div className="flex items-center border border-black/15 dark:border-white/15 rounded-xl bg-black/5 dark:bg-white/5">
              <button
                onClick={() => {
                  sound.playClick();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="p-2.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-l-xl transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-mono font-bold">{quantity}</span>
              <button
                onClick={() => {
                  sound.playClick();
                  setQuantity(quantity + 1);
                }}
                className="p-2.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-r-xl transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <button
              onClick={handleAddToCart}
              className={'py-4 rounded-2xl font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ' + (
                isAdded ? 'bg-black text-white' : 'bg-[#eb3324] hover:bg-[#c41d10] text-white'
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                </>
              )}
            </button>
            <button
              onClick={() => buyNow(product, currentSize, quantity, currentColor)}
              className="py-4 rounded-2xl font-mono text-sm font-bold border-2 border-[#eb3324] text-[#eb3324] hover:bg-[#eb3324] hover:text-white transition-all active:scale-[0.98]"
            >
              Buy Now
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono opacity-70 mb-8">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#eb3324]" /> Delivery across Pakistan
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-[#eb3324]" /> Cash on delivery
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <h2 className="text-xs font-mono uppercase font-bold mb-3">Details</h2>
            <ul className="text-sm space-y-2 opacity-80 list-disc list-inside">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h2 className="font-heading text-2xl font-black mb-6">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} viewMode="grid-3" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
