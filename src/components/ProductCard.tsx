import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Plus, Eye, Check, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid-3' | 'grid-2' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { setActiveProductModal, addToCart, buyNow } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'One Size';
    addToCart(product, defaultSize, 1, product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    buyNow(product, product.sizes[0] || 'One Size', 1, product.colors[0]);
  };

  const handleOpenDetail = () => {
    sound.playPop();
    setActiveProductModal(product);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleOpenDetail}
        onMouseEnter={() => {
          setIsHovered(true);
          sound.playPop();
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-black/10 dark:border-white/10 hover:border-[#eb3324] transition-all cursor-pointer gap-6"
      >
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="w-20 h-24 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-black/5 flex-shrink-0 relative">
            <img
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#eb3324] uppercase tracking-wider mb-1 font-bold">
              {product.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading group-hover:text-[#eb3324] transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-black/60 dark:text-cream/60 line-clamp-1 max-w-md mt-1">
              {product.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-black/5 dark:border-white/5">
          <div className="text-lg font-mono font-bold">{product.formattedPrice}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white dark:bg-[#eb3324] text-xs font-mono font-bold hover:bg-[#eb3324] dark:hover:bg-[#c41d10] transition-colors"
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{added ? 'Added' : 'Add to Bag'}</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#eb3324] text-white text-xs font-mono font-bold hover:bg-[#c41d10] transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
            <button
              onClick={handleOpenDetail}
              className="p-2 rounded-full border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleOpenDetail}
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playPop();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300 select-none"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:border-[#eb3324] transition-all duration-300">
        
        <img
          src={product.images[0]}
          alt={product.title}
          className={'w-full h-full object-cover transition-all duration-700 ease-out ' + (
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          )}
          loading="lazy"
        />

        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.title}
            className={'absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ' + (
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
            loading="lazy"
          />
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-[#eb3324] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 left-3 flex items-center gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-2 md:group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black text-white text-xs font-mono font-bold shadow-lg hover:bg-black/80 transition-all active:scale-95"
          >
            {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{added ? 'Added' : 'Add to Bag'}</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#eb3324] text-white text-xs font-mono font-bold shadow-lg hover:bg-[#c41d10] transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>
        </div>

      </div>

      <div className="mt-3.5 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg tracking-tight group-hover:text-[#eb3324] transition-colors leading-tight">
            {product.title}
          </h3>
          <p className="text-xs font-mono text-black/50 dark:text-cream/50 mt-0.5 font-semibold">
            {product.category}
          </p>
        </div>

        <div className="text-sm font-mono font-bold text-right tabular-nums">
          {product.formattedPrice}
        </div>
      </div>

    </div>
  );
};
