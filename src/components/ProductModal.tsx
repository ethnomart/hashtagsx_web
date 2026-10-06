import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Check, ShieldCheck, Truck } from 'lucide-react';
import { sound } from '../utils/sound';
import { formatPrice } from '../utils/currency';

export const ProductModal: React.FC = () => {
  const { activeProductModal, setActiveProductModal, addToCart, buyNow, setIsShippingOpen } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const currentColor = selectedColor || product.colors?.[0] || undefined;
  const availableSizes = (currentColor && product.sizesByColor?.[currentColor]) || product.sizes;
  const currentSize = availableSizes.includes(selectedSize) ? selectedSize : availableSizes[0] || 'Standard';

  const handleAddToCart = () => {
    addToCart(product, currentSize, quantity, currentColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.playClick();
          setActiveProductModal(null);
        }}
      />

      <div className="relative w-full max-w-4xl bg-cream dark:bg-[#121214] text-black dark:text-cream rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        <button
          onClick={() => {
            sound.playClick();
            setActiveProductModal(null);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.02]">
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/50 dark:bg-black/50 relative shadow-inner">
            <img
              src={product.images[selectedImgIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playClick();
                    setSelectedImgIndex(i);
                  }}
                  className={'w-14 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ' + (
                    selectedImgIndex === i
                      ? 'border-[#eb3324] scale-95 shadow'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#eb3324] font-bold tracking-widest uppercase mb-1">
              <span>{product.category}</span>
              <span className="text-black/40 dark:text-white/40">SKU: HX-{product.slug.toUpperCase().slice(0, 6)}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-heading mb-2">
              {product.title}
            </h2>

            <div className="text-2xl font-mono font-bold mb-4 text-[#eb3324]">
              {product.formattedPrice}
            </div>

            <p className="text-sm text-black/75 dark:text-cream/75 leading-relaxed mb-6">
              {product.description}
            </p>

            {product.colors && product.colors.length > 1 && (
              <div className="mb-6">
                <div className="text-xs font-mono uppercase mb-2">
                  <span className="font-bold">Select Colour</span>
                  <span className="opacity-60">: {currentColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        sound.playClick();
                        setSelectedColor(color);
                        const idx = product.colorImages?.[color];
                        if (idx !== undefined) setSelectedImgIndex(idx);
                      }}
                      className={'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ' + (
                        currentColor === color
                          ? 'bg-[#eb3324] text-white shadow-sm'
                          : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableSizes.length > 0 && availableSizes[0] !== 'One Size' && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase mb-2">
                  <span className="font-bold">Select Size</span>
                  <button
                    onClick={() => setIsShippingOpen(true)}
                    className="text-[#eb3324] hover:underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        sound.playClick();
                        setSelectedSize(size);
                      }}
                      className={'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ' + (
                        currentSize === size
                          ? 'bg-[#eb3324] text-white shadow-sm'
                          : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono uppercase font-bold">Quantity</span>
              <div className="flex items-center border border-black/15 dark:border-white/15 rounded-xl bg-black/5 dark:bg-white/5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-l-xl transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    setQuantity(quantity + 1);
                  }}
                  className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-r-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-6">
              <h4 className="text-xs font-mono uppercase font-bold mb-2">Specifications</h4>
              <ul className="text-xs space-y-1.5 opacity-80 list-disc list-inside">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
            <button
              onClick={handleAddToCart}
              className={'w-full py-4 rounded-2xl font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 ' + (
                isAdded
                  ? 'bg-black text-white'
                  : 'bg-[#eb3324] hover:bg-[#c41d10] text-white'
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {quantity} to Bag!</span>
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
              className="w-full py-4 rounded-2xl font-mono text-sm font-bold border-2 border-[#eb3324] text-[#eb3324] hover:bg-[#eb3324] hover:text-white transition-all active:scale-98"
            >
              Buy Now
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] font-mono opacity-60">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#eb3324]" /> Free returns
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#eb3324]" /> Authentic piece
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
