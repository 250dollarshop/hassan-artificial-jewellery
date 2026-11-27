import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { formatDualPrice } from '../../config/store';
import { useStore } from '../../context/StoreContext';
import { SectionHeading } from '../SectionHeading';
import { ProductCard } from '../ProductCard';
import { LuxuryImage } from '../LuxuryImage';

export const HomeSectionsUpper: React.FC = () => {
  const { currency } = useStore();
  const [activeTab, setActiveTab] = useState<'best' | 'new' | 'top'>('best');
  const [hoveredParadeId, setHoveredParadeId] = useState<string | null>(null);

  // Flash sale countdown (14h 28m 45s ticking)
  const [secondsLeft, setSecondsLeft] = useState(14 * 3600 + 28 * 60 + 45);
  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 14 * 3600));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  // All 10 Daraz products reused across parade, tabs, and flash sale in different orders
  const paradeProducts = PRODUCTS;
  const flashSaleProducts = [...PRODUCTS].sort((a, b) => {
    const discA = a.oldPricePKR ? (a.oldPricePKR - a.pricePKR) / a.oldPricePKR : 0;
    const discB = b.oldPricePKR ? (b.oldPricePKR - b.pricePKR) / b.oldPricePKR : 0;
    return discB - discA;
  });

  const bestSellers = PRODUCTS.slice(0, 8);
  const newArrivals = [...PRODUCTS].reverse().slice(0, 8);
  const topRated = [...PRODUCTS]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 8);

  const tabProducts =
    activeTab === 'best' ? bestSellers : activeTab === 'new' ? newArrivals : topRated;

  const bridalHeroProduct = PRODUCTS[0];

  return (
    <>
      {/* D) SHOP BY CATEGORY — Only Non-Empty Categories (Champagne Mood) */}
      <section className="bg-[#F6EBD9] dark:bg-[#290E15] py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Explore Our Craft"
            title="Shop by Category"
            shimmerWord="Category"
            viewAllTo="/shop"
            viewAllLabel="All Designs"
          />

          <div
            className={`grid gap-5 sm:gap-6 ${
              CATEGORIES.length <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
            }`}
          >
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.3) }}
                whileHover={{ y: -4, rotateX: 3, rotateY: -3 }}
                style={{ perspective: 800 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group relative block aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFFBF5] p-5 border border-[#C9A24B]/45 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <LuxuryImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/90 via-[#2B070E]/15 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-5 transform group-hover:-translate-y-1 transition-transform duration-300">
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-[#F4D58D] mb-0.5">
                      {cat.itemCount} {cat.itemCount === 1 ? 'Design' : 'Designs'}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FFFBF5] leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#EADFCB]/90 line-clamp-1 mt-1">
                      {cat.shortDesc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* E) PRODUCT PARADE — Continuous Right-to-Left Strip of All 10 Products (Ivory Mood) */}
      <section className="bg-[#FFFBF5] dark:bg-[#1D090E] py-16 lg:py-24 overflow-hidden border-y border-[#EADFCB] dark:border-[#562630]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-8">
          <SectionHeading
            label="Atelier Highlights"
            title="Jewels in Motion"
            shimmerWord="Motion"
            viewAllTo="/shop"
          />
        </div>

        <div className="relative w-full overflow-hidden py-4">
          <div className="animate-parade gap-6 px-3">
            {[...paradeProducts, ...paradeProducts].map((p, idx) => {
              const price = formatDualPrice(p.pricePKR, currency);
              const isHovered = hoveredParadeId === `${p.id}-${idx}`;
              return (
                <Link
                  key={`${p.id}-${idx}`}
                  to={`/product/${p.slug}`}
                  onMouseEnter={() => setHoveredParadeId(`${p.id}-${idx}`)}
                  onMouseLeave={() => setHoveredParadeId(null)}
                  className="relative group w-44 sm:w-52 shrink-0 flex flex-col items-center"
                >
                  <div
                    className={`w-44 sm:w-52 aspect-[4/5] rounded-2xl overflow-hidden border border-[#C9A24B]/40 bg-[#FFFBF5] p-3 shadow-md transition-transform duration-500 ${
                      idx % 2 === 0 ? 'animate-float-bob' : ''
                    } group-hover:scale-105 group-hover:rotate-1`}
                  >
                    <LuxuryImage src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div
                    className={`mt-3 text-center transition-all duration-300 ${
                      isHovered ? 'opacity-100 -translate-y-0.5' : 'opacity-90'
                    }`}
                  >
                    <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] truncate max-w-[190px]">
                      {p.name}
                    </p>
                    <p className="text-xs font-semibold text-[#8B0A1A] dark:text-[#F4D58D] tabular-nums">
                      {price.primary} · <span className="font-normal opacity-80">{price.secondary}</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* F) BEST SELLERS / NEW ARRIVALS / TOP RATED TABS (Champagne Mood) */}
      <section className="bg-[#F6EBD9] dark:bg-[#290E15] py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-[#B8862B] dark:text-[#F4D58D] font-semibold mb-2">
                Curated For You
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                Signature <span className="text-gold-shimmer">Treasures</span>
              </h2>
            </div>

            <div className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-[#FFFBF5] dark:bg-[#33131C] border border-[#C9A24B]/40 self-start md:self-auto">
              {[
                { key: 'best', label: 'Best Sellers' },
                { key: 'new', label: 'New Arrivals' },
                { key: 'top', label: 'Top Rated' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as 'best' | 'new' | 'top')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#8B0A1A] text-white shadow-sm'
                      : 'text-[#6B5B53] dark:text-[#DEC9C0] hover:text-[#2B1B14] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {tabProducts.map((product, idx) => (
              <ProductCard key={`${activeTab}-${product.id}`} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* G) FULL-WIDTH BRIDAL BANNER (Deep Burgundy + Gold Mood) */}
      <section className="relative bg-gradient-to-r from-[#3A0A12] via-[#5A0F1C] to-[#3A0A12] text-[#FFFBF5] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 z-10"
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-[#F4D58D] font-semibold mb-3">
              Shadi Season Exclusive
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight mb-4 text-balance">
              Bridal Collection <span className="text-gold-shimmer">Special Offers</span>
            </h2>
            <p className="text-[#EADFCB] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              Coordinated bridal necklace sets, ruby locksets, and crystal suites with verified
              savings — delivered nationwide across Pakistan via Cash on Delivery.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/bridal"
                className="shine-sweep-parent min-h-[48px] px-7 py-3.5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-xl"
              >
                <span>Shop Bridal Suite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/custom-order"
                className="min-h-[48px] px-6 py-3.5 rounded-xl border border-[#F4D58D]/60 text-[#F4D58D] text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#F4D58D]/10 transition-colors inline-flex items-center"
              >
                Customize for Your Dress
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <Link
              to={`/product/${bridalHeroProduct.slug}`}
              className="relative w-72 sm:w-88 aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFFBF5] p-5 border-2 border-[#C9A24B] shadow-2xl animate-float-bob block"
            >
              <LuxuryImage
                src={bridalHeroProduct.images[0]}
                alt={bridalHeroProduct.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-[#8B0A1A] border border-[#F4D58D] text-[11px] font-bold uppercase tracking-wider text-[#F4D58D] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Bridal Edit
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* H) FLASH SALE — Burgundy Section with Flip Clock & Stock Bars */}
      <section className="bg-[#2D070F] text-[#FFFBF5] py-16 lg:py-24 border-t border-[#C9A24B]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-[#F4D58D] font-semibold mb-2">
                <Flame className="w-3.5 h-3.5 text-[#F4D58D]" /> Limited Time Offer
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FFFBF5]">
                Royal <span className="text-gold-shimmer">Flash Sale</span>
              </h2>
            </div>

            {/* Flip-Style Countdown Clock */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[#EADFCB] hidden sm:inline">
                Ends in
              </span>
              {[
                { val: hours, label: 'HRS' },
                { val: mins, label: 'MIN' },
                { val: secs, label: 'SEC' },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="min-w-[62px] rounded-xl bg-[#4B101B] border border-[#C9A24B]/60 px-3 py-2 text-center shadow-inner"
                >
                  <motion.span
                    key={unit.val}
                    initial={{ rotateX: -60, opacity: 0.4 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="block font-display text-2xl font-bold tabular-nums text-[#F4D58D]"
                  >
                    {unit.val}
                  </motion.span>
                  <span className="text-[10px] tracking-[0.2em] text-[#EADFCB]/80">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
            {flashSaleProducts.map((product, idx) => (
              <div key={product.id} className="w-[270px] sm:w-[290px] shrink-0 snap-start">
                <ProductCard product={product} index={idx} variant="dark" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
