import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { products, filterCategory, viewMode, searchQuery } = useStore();

  const filtered = products.filter(p => {
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-black/15 dark:border-white/15 rounded-3xl">
            <p className="font-heading text-xl font-bold mb-2">{products.length === 0 ? 'New collection coming soon' : 'No pieces found'}</p>
            <p className="text-xs font-mono opacity-60">{products.length === 0 ? 'Check back shortly for the first HASHTAGSX drop' : 'Try modifying your search or filter options'}</p>
          </div>
        ) : (
          <div
            className={'grid gap-6 sm:gap-8 ' + (
              viewMode === 'grid-3'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : viewMode === 'grid-2'
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1'
            )}
          >
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
