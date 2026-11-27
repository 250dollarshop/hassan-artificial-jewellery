import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List, X, Star, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { formatDualPrice, USD_TO_PKR } from '../config/store';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PriceDisplay } from '../components/PriceDisplay';
import { LuxuryImage } from '../components/LuxuryImage';

interface ShopPageProps {
  presetMode?: 'all' | 'new' | 'sale' | 'bridal';
}

export const ShopPage: React.FC<ShopPageProps> = ({ presetMode = 'all' }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currency, addToCart, recentlyViewed } = useStore();

  const initialQuery = searchParams.get('q') || '';
  const initialOccasion = searchParams.get('occasion') || (presetMode === 'bridal' ? 'Bridal' : '');

  const [selectedCategory, setSelectedCategory] = useState<string>(slug || '');
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPricePKR, setMaxPricePKR] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(slug || '');
    setVisibleCount(12);
  }, [slug]);

  useEffect(() => {
    const occ = searchParams.get('occasion');
    if (occ) setSelectedOccasion(occ);
  }, [searchParams]);

  const finishes = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.finish))), []);
  const occasions = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.occasion))), []);
  const colors = useMemo(
    () => Array.from(new Set(PRODUCTS.flatMap((p) => p.colors))),
    []
  );

  const filtered = useMemo(() => {
    const q = (searchParams.get('q') || initialQuery).trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (presetMode === 'new' && !p.isNewArrival) return false;
      if (presetMode === 'sale' && !p.oldPricePKR) return false;
      if (presetMode === 'bridal' && p.category !== 'bridal-sets') return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedFinish && p.finish !== selectedFinish) return false;
      if (selectedOccasion && p.occasion !== selectedOccasion) return false;
      if (
        selectedColor &&
        !p.colors.some((c) => c.toLowerCase() === selectedColor.toLowerCase())
      ) {
        return false;
      }
      if (p.rating < minRating) return false;
      if (p.pricePKR > maxPricePKR) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.categoryLabel.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.pricePKR - b.pricePKR);
    else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.pricePKR - a.pricePKR);
    else if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [
    presetMode,
    selectedCategory,
    selectedFinish,
    selectedOccasion,
    selectedColor,
    minRating,
    maxPricePKR,
    sortBy,
    searchParams,
    initialQuery,
  ]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);
  const pageTitle =
    presetMode === 'new'
      ? 'New Arrivals'
      : presetMode === 'sale'
      ? 'Royal Flash Sale & Offers'
      : presetMode === 'bridal'
      ? 'Bridal Sets'
      : activeCategoryObj
      ? activeCategoryObj.name
      : 'All Jewellery Designs';

  const maxPriceDisplay = formatDualPrice(maxPricePKR, currency);

  const resetAll = () => {
    setSelectedCategory('');
    setSelectedFinish('');
    setSelectedOccasion('');
    setSelectedColor('');
    setMinRating(0);
    setMaxPricePKR(1500);
    setSearchParams({});
  };

  const activeChips: { label: string; onClear: () => void }[] = [];
  if (selectedCategory) {
    activeChips.push({
      label: activeCategoryObj?.name || selectedCategory,
      onClear: () => setSelectedCategory(''),
    });
  }
  if (selectedFinish) activeChips.push({ label: selectedFinish, onClear: () => setSelectedFinish('') });
  if (selectedOccasion)
    activeChips.push({ label: selectedOccasion, onClear: () => setSelectedOccasion('') });
  if (selectedColor) activeChips.push({ label: selectedColor, onClear: () => setSelectedColor('') });
  if (minRating > 0) activeChips.push({ label: `${minRating}+ Stars`, onClear: () => setMinRating(0) });
  if (maxPricePKR < 1500)
    activeChips.push({
      label: `Under ${maxPriceDisplay.primary}`,
      onClear: () => setMaxPricePKR(1500),
    });

  const recentProducts = PRODUCTS.filter((p) => recentlyViewed.includes(p.id)).slice(0, 4);

  const FilterPanel = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold mb-3">
          Categories
        </h3>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              !selectedCategory
                ? 'bg-[#8B0A1A] text-white'
                : 'text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C]'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                selectedCategory === c.slug
                  ? 'bg-[#8B0A1A] text-white'
                  : 'text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C]'
              }`}
            >
              <span>{c.name}</span>
              <span className="opacity-70">{c.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            Max Price ({currency})
          </h3>
          <span className="text-xs font-semibold tabular-nums text-[#2B1B14] dark:text-[#FBF4E9]">
            {maxPriceDisplay.primary}
          </span>
        </div>
        <input
          type="range"
          min={800}
          max={1500}
          step={50}
          value={maxPricePKR}
          onChange={(e) => setMaxPricePKR(Number(e.target.value))}
          className="w-full accent-[#8B0A1A] cursor-pointer"
          aria-label="Maximum price filter"
        />
        <div className="flex justify-between text-[11px] text-[#6B5B53] dark:text-[#DEC9C0] tabular-nums">
          <span>{currency === 'PKR' ? 'Rs. 800' : `$${(800 / USD_TO_PKR).toFixed(2)}`}</span>
          <span>{currency === 'PKR' ? 'Rs. 1,500' : `$${(1500 / USD_TO_PKR).toFixed(2)}`}</span>
        </div>
      </div>

      {/* Finish / Material */}
      <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold mb-3">
          Material &amp; Finish
        </h3>
        <div className="space-y-1.5">
          {finishes.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFinish(selectedFinish === f ? '' : f)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                selectedFinish === f
                  ? 'bg-[#C9A24B] text-[#2B1B14] font-semibold'
                  : 'text-[#6B5B53] dark:text-[#DEC9C0] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold mb-3">
          Occasion
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {occasions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setSelectedOccasion(selectedOccasion === o ? '' : o)}
              className={`px-3 py-1.5 rounded-lg text-xs border cursor-pointer ${
                selectedOccasion === o
                  ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white'
                  : 'border-[#EADFCB] dark:border-[#562630] text-[#2B1B14] dark:text-[#FBF4E9]'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold mb-3">
          Stone &amp; Tone
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedColor(selectedColor === c ? '' : c)}
              className={`px-2.5 py-1 rounded-lg text-xs border cursor-pointer ${
                selectedColor === c
                  ? 'bg-[#C9A24B] border-[#C9A24B] text-[#2B1B14] font-semibold'
                  : 'border-[#EADFCB] dark:border-[#562630] text-[#6B5B53] dark:text-[#DEC9C0]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold mb-3">
          Minimum Rating
        </h3>
        <div className="flex gap-2">
          {[4.5, 4.9].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`px-3 py-1.5 rounded-lg text-xs border inline-flex items-center gap-1 cursor-pointer ${
                minRating === r
                  ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white'
                  : 'border-[#EADFCB] dark:border-[#562630] text-[#2B1B14] dark:text-[#FBF4E9]'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
              <span>{r}+</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#F6EBD9] dark:bg-[#290E15] border-b border-[#EADFCB] dark:border-[#562630] py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#B8862B] dark:text-[#F4D58D] font-semibold">
            Hassan Artificial Jewellery Boutique
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#6B5B53] dark:text-[#DEC9C0] mt-2 max-w-2xl">
            Showing {filtered.length} authentic Daraz pieces · Prices shown in {currency} with instant
            dual currency conversion.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-14">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#EADFCB] dark:border-[#562630]">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="lg:hidden h-10 px-4 rounded-xl border border-[#C9A24B] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {activeChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={chip.onClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F6EBD9] dark:bg-[#33131C] border border-[#C9A24B]/50 text-xs font-medium text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
              >
                <span>{chip.label}</span>
                <X className="w-3.5 h-3.5 text-[#8B0A1A] dark:text-[#F4D58D]" />
              </button>
            ))}

            {activeChips.length > 0 && (
              <button
                type="button"
                onClick={resetAll}
                className="text-xs font-semibold text-[#8B0A1A] dark:text-[#F4D58D] hover:underline px-2 cursor-pointer"
              >
                Reset all
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="h-10 px-3 rounded-xl bg-white dark:bg-[#33131C] border border-[#EADFCB] dark:border-[#562630] text-xs font-medium text-[#2B1B14] dark:text-[#FBF4E9]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="hidden sm:inline-flex rounded-xl border border-[#EADFCB] dark:border-[#562630] p-0.5 bg-white dark:bg-[#33131C]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#8B0A1A] text-white' : 'text-[#6B5B53]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#8B0A1A] text-white' : 'text-[#6B5B53]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Collapsible */}
        {mobileFiltersOpen && (
          <div className="lg:hidden mb-8 p-5 rounded-2xl bg-[#F6EBD9]/50 dark:bg-[#290E15] border border-[#C9A24B]/40">
            {FilterPanel}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-6 rounded-2xl bg-[#F6EBD9]/45 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
            {FilterPanel}
          </aside>

          {/* Product Results */}
          <div className="lg:col-span-9">
            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-[#EADFCB] dark:border-[#562630] bg-[#F6EBD9]/30 dark:bg-[#290E15]">
                <p className="font-display text-2xl text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
                  No matching jewellery found
                </p>
                <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mb-6">
                  Try widening your price slider or clearing active filters.
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-6 py-3 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filtered.slice(0, visibleCount).map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.slice(0, visibleCount).map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-white dark:bg-[#33131C] border border-[#EADFCB] dark:border-[#562630]"
                  >
                    <Link
                      to={`/product/${p.slug}`}
                      className="w-full sm:w-44 aspect-[4/5] rounded-xl overflow-hidden bg-[#FFFBF5] p-3 shrink-0"
                    >
                      <LuxuryImage src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
                          {p.categoryLabel} · {p.finish}
                        </span>
                        <Link
                          to={`/product/${p.slug}`}
                          className="block font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-1 mb-2"
                        >
                          {p.name}
                        </Link>
                        <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] line-clamp-2 mb-4">
                          {p.description}
                        </p>
                      </div>
                      <div className="flex items-end justify-between gap-4 pt-3 border-t border-[#EADFCB] dark:border-[#562630]">
                        <PriceDisplay pricePKR={p.pricePKR} oldPricePKR={p.oldPricePKR} />
                        <button
                          type="button"
                          onClick={(e) =>
                            addToCart(p, 1, p.colors[0], p.sizes[0], e.currentTarget.getBoundingClientRect())
                          }
                          className="h-11 px-5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recently Viewed Strip */}
            {recentProducts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#EADFCB] dark:border-[#562630]">
                <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-6">
                  Recently Viewed
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentProducts.map((p, idx) => (
                    <ProductCard key={`recent-${p.id}`} product={p} index={idx} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
