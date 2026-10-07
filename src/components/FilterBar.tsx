import React from 'react';
import { LayoutGrid, Grid3X3, List, Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FilterCategory } from '../types';
import { sound } from '../utils/sound';

const CATEGORIES: FilterCategory[] = [
  'All',
  'Hoodies',
  'Shirts',
  'Leather Jackets',
  'Bottoms',
  'Sports',
  'Accessories',
  'Perfumes'
];

export const FilterBar: React.FC = () => {
  const {
    filterCategory,
    setFilterCategory,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    products
  } = useStore();

  const filteredCount = products.filter(p => {
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).length;

  return (
    <div id="product-catalog" className="sticky top-[69px] z-30 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-black/10 dark:border-white/10 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setFilterCategory(cat);
              }}
              className={'px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap ' + (
                filterCategory === cat
                  ? 'bg-[#eb3324] text-white shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-cream/70 hover:bg-black/10 dark:hover:bg-white/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Search pieces..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#eb3324] placeholder:text-black/40 dark:placeholder:text-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <span className="text-xs font-mono opacity-50 hidden sm:inline tabular-nums whitespace-nowrap">
            {filteredCount} Items
          </span>

          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/10 dark:border-white/10">
            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid-3');
              }}
              title="3-Column Grid"
              aria-label="3 Column Grid"
              className={'p-1.5 rounded-full transition-all ' + (
                viewMode === 'grid-3'
                  ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white'
                  : 'opacity-50 hover:opacity-100'
              )}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('grid-2');
              }}
              title="2-Column Grid"
              aria-label="2 Column Grid"
              className={'p-1.5 rounded-full transition-all ' + (
                viewMode === 'grid-2'
                  ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white'
                  : 'opacity-50 hover:opacity-100'
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setViewMode('list');
              }}
              title="List View"
              aria-label="List View"
              className={'p-1.5 rounded-full transition-all ' + (
                viewMode === 'list'
                  ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white'
                  : 'opacity-50 hover:opacity-100'
              )}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
