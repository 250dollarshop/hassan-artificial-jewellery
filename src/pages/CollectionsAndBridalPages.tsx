import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Heart, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { LOOKBOOK_ITEMS } from '../data/articles';
import { formatDualPrice } from '../config/store';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { LuxuryImage } from '../components/LuxuryImage';

export const BridalPage: React.FC = () => {
  const bridalProducts = PRODUCTS.filter((p) => p.category === 'bridal-sets');

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen">
      {/* Bridal Hero */}
      <section className="relative bg-gradient-to-br from-[#3A0A12] via-[#5A0F1C] to-[#2B070E] text-[#FFFBF5] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-[#F4D58D] font-semibold">
              Hassan Bridal Atelier · Sialkot
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mt-3 mb-5 leading-tight">
              The Royal <span className="text-gold-shimmer">Bridal</span> Suite
            </h1>
            <p className="text-base sm:text-lg text-[#EADFCB] max-w-xl mb-8 leading-relaxed">
              Coordinated bridal necklace sets featuring luminous crystals, ruby blooms, and gold-tone
              artistry — arriving safely across Pakistan via Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/custom-order"
                className="px-7 py-3.5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Custom Colour Match</span>
              </Link>
              <Link
                to="/size-guide"
                className="px-6 py-3.5 rounded-xl border border-[#F4D58D]/60 text-[#F4D58D] text-xs font-semibold uppercase tracking-wider"
              >
                Size Calculator
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-3 border-2 border-[#C9A24B]">
              <LuxuryImage
                src={bridalProducts[0]?.images[0] || PRODUCTS[0].images[0]}
                alt="Necklace Set With Earrings"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-3 border-2 border-[#C9A24B] mt-6">
              <LuxuryImage
                src={bridalProducts[2]?.images[0] || PRODUCTS[4].images[0]}
                alt="Crystal White Gold Jewellery Set"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            {bridalProducts.length} Bridal Designs
          </span>
          <h2 className="font-display text-3xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-1">
            Coordinated Bridal Necklace &amp; Earring Sets
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bridalProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const CollectionsPage: React.FC = () => {
  const collections = [
    {
      name: 'Bridal Heritage Sets',
      occasion: 'Bridal',
      desc: 'Coordinated necklace, earring, and crystal bridal suites.',
      image: PRODUCTS[0].images[0],
    },
    {
      name: 'Ruby & Crystal Party Wear',
      occasion: 'Party Wear',
      desc: 'Statement ruby locksets and black crystal evening sets.',
      image: PRODUCTS[1].images[0],
    },
    {
      name: 'Mehndi & Festive Gold',
      occasion: 'Mehndi',
      desc: 'Sunburst golden stone jhumka earrings and floral sets.',
      image: PRODUCTS[7].images[0],
    },
    {
      name: 'Giftable Crystal Edit',
      occasion: 'Gifts',
      desc: 'Crystal drop and ruby gold sets ideal for special celebrations.',
      image: PRODUCTS[2].images[0],
    },
  ];

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            Signature Curation
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            Our <span className="text-gold-shimmer">Collections</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => {
            const count = PRODUCTS.filter((p) => p.occasion === col.occasion).length;
            return (
              <Link
                key={col.name}
                to={`/shop?occasion=${encodeURIComponent(col.occasion)}`}
                className="group relative rounded-3xl overflow-hidden border border-[#C9A24B]/50 shadow-lg bg-[#FFFBF5] p-6 aspect-[16/11] flex items-end"
              >
                <div className="absolute inset-0 p-6 bg-[#FFFBF5]">
                  <LuxuryImage
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/92 via-[#2B070E]/25 to-transparent" />
                <div className="relative z-10 text-[#FFFBF5]">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#F4D58D] font-semibold">
                    {count} Curated {count === 1 ? 'Piece' : 'Pieces'}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-2">
                    {col.name}
                  </h2>
                  <p className="text-sm text-[#EADFCB] max-w-md mb-4">{col.desc}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4D58D]">
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const GiftGuidePage: React.FC = () => {
  const { currency } = useStore();
  const [tier, setTier] = useState<'under999' | 'mid1099' | 'premium1100'>('under999');

  const tiers = [
    { key: 'under999', label: `Under ${formatDualPrice(1000, currency).primary}`, max: 999, min: 0 },
    {
      key: 'mid1099',
      label: `${formatDualPrice(1000, currency).primary} – ${formatDualPrice(1099, currency).primary}`,
      max: 1099,
      min: 1000,
    },
    { key: 'premium1100', label: `${formatDualPrice(1100, currency).primary}+`, max: 5000, min: 1100 },
  ] as const;

  const currentTier = tiers.find((t) => t.key === tier)!;
  const items = PRODUCTS.filter(
    (p) => p.pricePKR >= currentTier.min && p.pricePKR <= currentTier.max
  );

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            <Gift className="w-4 h-4" /> Thoughtful Luxury
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-3">
            Gift Guide by Budget
          </h1>
          <p className="text-sm sm:text-base text-[#6B5B53] dark:text-[#DEC9C0]">
            Select your preferred gift tier in {currency} — every set includes signature gift-ready
            packaging.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tiers.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTier(t.key)}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                tier === t.key
                  ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white shadow-md'
                  : 'border-[#C9A24B]/60 text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LookbookPage: React.FC = () => {
  const [occasionFilter, setOccasionFilter] = useState<string>('All');
  const occasions = ['All', 'Bridal', 'Party Wear', 'Mehndi', 'Festive', 'Gifts'];
  const items =
    occasionFilter === 'All'
      ? LOOKBOOK_ITEMS
      : LOOKBOOK_ITEMS.filter((i) => i.occasion === occasionFilter);

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
              Editorial Gallery
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
              Bridal &amp; Festive <span className="text-gold-shimmer">Lookbook</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {occasions.map((occ) => (
              <button
                key={occ}
                type="button"
                onClick={() => setOccasionFilter(occ)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                  occasionFilter === occ
                    ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white'
                    : 'border-[#EADFCB] dark:border-[#562630] text-[#2B1B14] dark:text-[#FBF4E9]'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((look) => (
            <div
              key={look.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-5 border border-[#C9A24B]/50 shadow-lg"
            >
              <LuxuryImage
                src={look.image}
                alt={look.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/92 via-[#2B070E]/15 to-transparent pointer-events-none" />
              {look.hotspots.map((h, i) => (
                <Link
                  key={i}
                  to={`/product/${h.productSlug}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/dot z-10"
                >
                  <span className="relative flex items-center justify-center w-7 h-7">
                    <span className="absolute inset-0 rounded-full bg-[#F4D58D] animate-ping opacity-70" />
                    <span className="w-4 h-4 rounded-full bg-white border-2 border-[#8B0A1A]" />
                  </span>
                  <span className="hidden group-hover/dot:block absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#3A0A12] text-[#F4D58D] text-xs font-semibold border border-[#C9A24B] shadow-xl">
                    Shop {h.label}
                  </span>
                </Link>
              ))}

              <Link to={`/product/${look.productSlug}`} className="absolute bottom-5 left-5 right-5 text-[#FFFBF5] block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#F4D58D]">
                  {look.occasion}
                </span>
                <h2 className="font-display text-2xl font-semibold">{look.title}</h2>
                <p className="text-xs text-[#EADFCB] mt-1">{look.subtitle}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WishlistPage: React.FC = () => {
  const { wishlist } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            Saved Treasures
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            Your Wishlist ({savedProducts.length})
          </h1>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-[#EADFCB] dark:border-[#562630] bg-[#F6EBD9]/40 dark:bg-[#290E15]">
            <Heart className="w-10 h-10 text-[#C9A24B] mx-auto mb-3" />
            <h2 className="font-display text-2xl text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mb-6">
              Tap the heart icon on any piece to save it for your upcoming wedding or Eid look.
            </p>
            <Link
              to="/shop"
              className="px-7 py-3.5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-bold uppercase tracking-wider"
            >
              Explore Boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
