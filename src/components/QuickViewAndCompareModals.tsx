import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatPKR, formatUSD, buildWhatsAppLink } from '../config/store';
import { PriceDisplay } from './PriceDisplay';
import { LuxuryImage } from './LuxuryImage';

export const QuickViewAndCompareModals: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    toggleCompare,
    trackRecentlyViewed,
  } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(0);
      setSelectedColor(quickViewProduct.colors[0] || quickViewProduct.color || 'Gold');
      setSelectedSize(quickViewProduct.sizes[0] || 'Free Size (Adjustable)');
      trackRecentlyViewed(quickViewProduct.id);
    }
  }, [quickViewProduct, trackRecentlyViewed]);

  const compareProducts = PRODUCTS.filter((p) => compareList.includes(p.id));

  const handleWhatsAppQuick = () => {
    if (!quickViewProduct) return;
    const msg = `Assalam-o-Alaikum Hassan Artificial Jewellery!\nI want to order:\n• Product: ${quickViewProduct.name}\n• Price: ${formatPKR(quickViewProduct.pricePKR)} (${formatUSD(quickViewProduct.pricePKR)})\n• Color: ${selectedColor}\n• Quantity: 1`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-[#1D090E]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFBF5] dark:bg-[#290E15] border border-[#C9A24B]/50 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close quick view"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FFFBF5]/90 dark:bg-[#33131C] border border-[#EADFCB] flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 bg-[#F6EBD9]/50 dark:bg-[#1D090E]/50">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#FFFBF5] p-3 border border-[#EADFCB] mb-3">
                    <LuxuryImage
                      src={quickViewProduct.images[activeImage]}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {quickViewProduct.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(i)}
                        className={`aspect-square rounded-lg overflow-hidden bg-[#FFFBF5] p-1 border-2 cursor-pointer ${
                          activeImage === i ? 'border-[#C9A24B]' : 'border-transparent opacity-70'
                        }`}
                      >
                        <LuxuryImage src={img} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
                    {quickViewProduct.categoryLabel} · {quickViewProduct.occasion}
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-1 mb-2">
                    {quickViewProduct.name}
                  </h2>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-[#C9A24B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                      {quickViewProduct.rating} ({quickViewProduct.reviewCount} verified reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    <PriceDisplay
                      pricePKR={quickViewProduct.pricePKR}
                      oldPricePKR={quickViewProduct.oldPricePKR}
                      size="lg"
                    />
                  </div>

                  <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed mb-5">
                    {quickViewProduct.description}
                  </p>

                  {/* Color Variants */}
                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
                      Color / Finish: <span className="text-[#B8862B]">{selectedColor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                            selectedColor === c
                              ? 'border-[#8B0A1A] bg-[#8B0A1A] text-white'
                              : 'border-[#EADFCB] dark:border-[#562630] text-[#2B1B14] dark:text-[#FBF4E9]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        addToCart(
                          quickViewProduct,
                          1,
                          selectedColor,
                          selectedSize,
                          e.currentTarget.getBoundingClientRect()
                        );
                        setQuickViewProduct(null);
                      }}
                      className="w-full h-12 rounded-xl bg-gold-gradient text-[#2B1B14] font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleWhatsAppQuick}
                        className="h-11 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Order on WhatsApp</span>
                      </button>
                      <Link
                        to={`/product/${quickViewProduct.slug}`}
                        onClick={() => setQuickViewProduct(null)}
                        className="h-11 rounded-xl border border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D] text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <span>Full Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareOpen(false)}
              className="fixed inset-0 bg-[#1D090E]/65 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#FFFBF5] dark:bg-[#290E15] border border-[#C9A24B]/50 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#EADFCB] dark:border-[#562630]">
                <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  Compare Jewellery Designs ({compareProducts.length}/3)
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCompareOpen(false)}
                  aria-label="Close compare modal"
                  className="w-10 h-10 rounded-full hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {compareProducts.length === 0 ? (
                <p className="text-center py-8 text-sm text-[#6B5B53] dark:text-[#DEC9C0]">
                  Select the scale icon on up to 3 products to compare finishes, pricing, and details side by side.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {compareProducts.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-[#EADFCB] dark:border-[#562630] bg-white dark:bg-[#33131C] p-4 flex flex-col"
                    >
                      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#FFFBF5] p-2 mb-3">
                        <LuxuryImage src={p.images[0]} alt={p.name} className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => toggleCompare(p.id)}
                          aria-label={`Remove ${p.name} from compare`}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-[#8B0A1A] flex items-center justify-center cursor-pointer shadow"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-display text-base font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
                        {p.name}
                      </h3>
                      <PriceDisplay pricePKR={p.pricePKR} oldPricePKR={p.oldPricePKR} size="sm" />
                      <dl className="mt-4 space-y-2 text-xs border-t border-[#EADFCB] dark:border-[#562630] pt-3">
                        <div className="flex justify-between gap-2">
                          <dt className="text-[#6B5B53] dark:text-[#DEC9C0]">Category</dt>
                          <dd className="font-medium text-right text-[#2B1B14] dark:text-[#FBF4E9]">{p.categoryLabel}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-[#6B5B53] dark:text-[#DEC9C0]">Colors</dt>
                          <dd className="font-medium text-right text-[#2B1B14] dark:text-[#FBF4E9]">
                            {p.colors.join(', ')}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-[#6B5B53] dark:text-[#DEC9C0]">Stock</dt>
                          <dd className="font-medium text-[#2B1B14] dark:text-[#FBF4E9]">{p.stock} pcs</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-[#6B5B53] dark:text-[#DEC9C0]">Anti-Tarnish</dt>
                          <dd className="inline-flex items-center gap-1 text-[#B8862B] font-semibold">
                            <Check className="w-3.5 h-3.5" /> Yes
                          </dd>
                        </div>
                      </dl>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(p);
                          setIsCompareOpen(false);
                        }}
                        className="mt-4 w-full h-10 rounded-lg bg-gold-gradient text-[#2B1B14] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
