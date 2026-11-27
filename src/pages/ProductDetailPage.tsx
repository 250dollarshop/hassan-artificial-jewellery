import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  ZoomIn,
  ChevronRight,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { formatPKR, formatUSD, buildWhatsAppLink } from '../config/store';
import { useStore } from '../context/StoreContext';
import { PriceDisplay } from '../components/PriceDisplay';
import { ProductCard } from '../components/ProductCard';
import { LuxuryImage } from '../components/LuxuryImage';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    trackRecentlyViewed,
    recentlyViewed,
  } = useStore();

  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || product.color);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Free Size (Adjustable)');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'details' | 'reviews'>('desc');

  useEffect(() => {
    setActiveImg(0);
    setZoomed(false);
    setSelectedColor(product.colors[0] || product.color);
    setSelectedSize(product.sizes[0] || 'Free Size (Adjustable)');
    setQuantity(1);
    trackRecentlyViewed(product.id);
    window.scrollTo(0, 0);
  }, [product, trackRecentlyViewed]);

  const wishlisted = isWishlisted(product.id);
  const totalPKR = product.pricePKR * quantity;
  const discountPct = product.oldPricePKR
    ? Math.round(((product.oldPricePKR - product.pricePKR) / product.oldPricePKR) * 100)
    : 0;

  const handleWhatsAppBuy = () => {
    const msg = `Assalam-o-Alaikum Hassan Artificial Jewellery!\nI would like to order:\n• Product: ${product.name}\n• Price: ${formatPKR(totalPKR)} (${formatUSD(totalPKR)})\n• Color: ${selectedColor}\n• Quantity: ${quantity}\nPlease confirm availability for Cash on Delivery.`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  const completeLookProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const recentProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && recentlyViewed.includes(p.id)
  ).slice(0, 4);

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#F6EBD9]/55 dark:bg-[#290E15] border-b border-[#EADFCB] dark:border-[#562630] py-3.5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs text-[#6B5B53] dark:text-[#DEC9C0] overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#8B0A1A] dark:hover:text-[#F4D58D]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to={`/category/${product.category}`}
            className="hover:text-[#8B0A1A] dark:hover:text-[#F4D58D]"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">{product.name}</span>
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery with Zoom */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div
              onClick={() => setZoomed((z) => !z)}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFFBF5] p-5 border border-[#C9A24B]/50 shadow-lg cursor-zoom-in mb-4"
            >
              <LuxuryImage
                src={product.images[activeImg]}
                alt={product.name}
                loading="eager"
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                }`}
              />
              {discountPct > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#8B0A1A] text-white text-xs font-bold uppercase tracking-wider">
                  -{discountPct}% OFF
                </span>
              )}
              <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#FFFBF5]/90 border border-[#EADFCB] text-[11px] font-semibold text-[#2B1B14] inline-flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-[#B8862B]" />
                <span>{zoomed ? 'Click to reset' : 'Click to zoom'}</span>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveImg(i);
                    setZoomed(false);
                  }}
                  className={`aspect-[4/5] rounded-xl overflow-hidden bg-[#FFFBF5] p-2 border-2 transition-all cursor-pointer ${
                    activeImg === i
                      ? 'border-[#8B0A1A] dark:border-[#F4D58D] shadow-md'
                      : 'border-[#EADFCB] dark:border-[#562630] opacity-70 hover:opacity-100'
                  }`}
                >
                  <LuxuryImage src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Sticky Buy Box */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] dark:text-[#F4D58D] font-semibold">
                  {product.categoryLabel} · {product.finish}
                </span>
                <span className="text-xs font-semibold text-[#8B0A1A] dark:text-[#F4D58D]">
                  {product.stock < 20 ? `Only ${product.stock} left` : `In Stock (${product.stock} available)`}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] leading-tight mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center text-[#C9A24B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                  {product.rating.toFixed(1)} · {product.reviewCount} Verified Reviews
                </span>
              </div>

              <PriceDisplay pricePKR={product.pricePKR} oldPricePKR={product.oldPricePKR} size="lg" />
            </div>

            <p className="text-sm sm:text-base text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
              {product.description}
            </p>

            {/* Color Variants */}
            <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2.5">
                Color / Plating: <span className="text-[#B8862B] dark:text-[#F4D58D]">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      selectedColor === c
                        ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white'
                        : 'border-[#EADFCB] dark:border-[#562630] text-[#2B1B14] dark:text-[#FBF4E9] hover:border-[#C9A24B]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  Size / Fit: <span className="text-[#B8862B] dark:text-[#F4D58D]">{selectedSize}</span>
                </p>
                <Link to="/size-guide" className="text-xs text-[#8B0A1A] dark:text-[#F4D58D] underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#F6EBD9] dark:bg-[#33131C] border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D]'
                        : 'border-[#EADFCB] dark:border-[#562630] text-[#6B5B53] dark:text-[#DEC9C0]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Primary CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center h-12 rounded-xl border border-[#C9A24B]/60 bg-white dark:bg-[#33131C]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-11 h-full flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold tabular-nums text-[#2B1B14] dark:text-[#FBF4E9]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    aria-label="Increase quantity"
                    className="w-11 h-full flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={(e) =>
                    addToCart(
                      product,
                      quantity,
                      selectedColor,
                      selectedSize,
                      e.currentTarget.getBoundingClientRect()
                    )
                  }
                  className="shine-sweep-parent flex-1 h-12 rounded-xl bg-gold-gradient text-[#2B1B14] font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatPKR(totalPKR)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  aria-label="Save to wishlist"
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center cursor-pointer ${
                    wishlisted
                      ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white'
                      : 'border-[#C9A24B]/60 text-[#2B1B14] dark:text-[#FBF4E9]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppBuy}
                className="w-full h-12 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Order on WhatsApp ({formatPKR(totalPKR)} / {formatUSD(totalPKR)})</span>
              </button>
            </div>

            {/* Delivery & Care Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#F6EBD9]/65 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
                <Truck className="w-4 h-4 text-[#B8862B] mb-1.5" />
                <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  Fast COD Delivery
                </p>
                <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                  Free above Rs. 5,000 / $18 across Pakistan.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6EBD9]/65 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
                <ShieldCheck className="w-4 h-4 text-[#B8862B] mb-1.5" />
                <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  7-Day Exchange
                </p>
                <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                  Hassle-free replacement on unboxing video.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6EBD9]/65 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
                <Sparkles className="w-4 h-4 text-[#B8862B] mb-1.5" />
                <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  Keepsake Care
                </p>
                <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                  Store dry away from perfume for lasting shine.
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="pt-4">
              <div className="flex border-b border-[#EADFCB] dark:border-[#562630] gap-6">
                {[
                  { id: 'desc', label: 'Description' },
                  { id: 'details', label: 'Craft & Details' },
                  { id: 'reviews', label: `Reviews (${product.reviewCount})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as 'desc' | 'details' | 'reviews')}
                    className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                      activeTab === t.id
                        ? 'border-[#8B0A1A] text-[#8B0A1A] dark:border-[#F4D58D] dark:text-[#F4D58D]'
                        : 'border-transparent text-[#6B5B53] dark:text-[#DEC9C0]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="py-5 text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
                {activeTab === 'desc' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <p>
                      <strong className="text-[#2B1B14] dark:text-[#FBF4E9]">Material:</strong>{' '}
                      {product.material}
                    </p>
                  </div>
                )}
                {activeTab === 'details' && (
                  <ul className="space-y-2 list-disc pl-5">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {CUSTOMER_REVIEWS.slice(0, 3).map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl bg-[#F6EBD9]/50 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                            {rev.name} ({rev.city})
                          </span>
                          <span className="text-xs text-[#B8862B]">Verified Buyer</span>
                        </div>
                        <p className="text-xs">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look */}
        <div className="mt-20 pt-14 border-t border-[#EADFCB] dark:border-[#562630]">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-8">
            Complete the <span className="text-gold-shimmer">Look</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {completeLookProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>

        {recentProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#EADFCB] dark:border-[#562630]">
            <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-6">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {recentProducts.map((p, idx) => (
                <ProductCard key={`rv-${p.id}`} product={p} index={idx} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
