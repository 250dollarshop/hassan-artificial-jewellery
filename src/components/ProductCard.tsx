import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, Heart, Scale, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { LuxuryImage } from './LuxuryImage';
import { PriceDisplay } from './PriceDisplay';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'compact' | 'dark';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  variant = 'default',
}) => {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, compareList, setQuickViewProduct } =
    useStore();
  const [hovered, setHovered] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const compared = compareList.includes(product.id);
  const discountPct = product.oldPricePKR
    ? Math.round(((product.oldPricePKR - product.pricePKR) / product.oldPricePKR) * 100)
    : 0;

  const isDarkCard = variant === 'dark';

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!wishlisted) {
      setHeartBurst(true);
      window.setTimeout(() => setHeartBurst(false), 650);
    }
    toggleWishlist(product.id, product.name);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, 1, product.colors[0], product.sizes[0], rect);
  };

  const xOffset = index % 2 === 0 ? -18 : 18;

  return (
    <motion.article
      initial={{ opacity: 0, x: xOffset, y: 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min((index % 4) * 0.06, 0.2), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col rounded-xl overflow-hidden border transition-shadow duration-300 ${
        isDarkCard
          ? 'bg-[#4B101B] border-[#C9A24B]/30 hover:border-[#F4D58D]/70 hover:shadow-xl hover:shadow-black/30'
          : 'bg-white dark:bg-[#33131C] border-[#EADFCB] dark:border-[#562630] hover:border-[#C9A24B]/60 hover:shadow-xl hover:shadow-[#C9A24B]/10'
      }`}
    >
      {/* Image Frame — consistent 4:5 aspect ratio on warm ivory studio tone */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFFBF5] p-3 block shine-sweep-parent"
      >
        <LuxuryImage
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-contain transition-transform duration-700 ease-out ${
            hovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {(product.images[1] || product.images[0]) && (
          <div
            className={`absolute inset-0 p-3 bg-[#FFFBF5] transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <LuxuryImage
              src={product.images[1] || product.images[0]}
              alt={`${product.name} alternate view`}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Single Top Tag (automatic discount % or New) */}
        {discountPct > 0 ? (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded bg-[#8B0A1A] text-[#FFFBF5] shadow-sm">
            -{discountPct}%
          </span>
        ) : product.isNewArrival ? (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded bg-gold-gradient text-[#2B1B14] shadow-sm">
            New
          </span>
        ) : null}

        {/* Action Icons Popping on Hover / Always accessible on touch */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <motion.button
            type="button"
            onClick={handleWishlist}
            whileTap={{ scale: 0.85 }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all cursor-pointer ${
              wishlisted
                ? 'bg-[#8B0A1A] border-[#8B0A1A] text-white'
                : 'bg-[#FFFBF5]/90 border-[#EADFCB] text-[#2B1B14] hover:border-[#C9A24B] hover:text-[#8B0A1A]'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            {heartBurst && (
              <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <motion.span
                    key={deg}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0.6, 1.1, 0],
                      x: Math.cos((deg * Math.PI) / 180) * 20,
                      y: Math.sin((deg * Math.PI) / 180) * 20,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.55 }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#F4D58D]"
                  />
                ))}
              </span>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            whileTap={{ scale: 0.85 }}
            aria-label={`Quick view ${product.name}`}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFFBF5]/90 border border-[#EADFCB] text-[#2B1B14] hover:border-[#C9A24B] hover:text-[#B8862B] backdrop-blur-md transition-all md:opacity-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            whileTap={{ scale: 0.85 }}
            aria-label={`Compare ${product.name}`}
            className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all md:opacity-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 cursor-pointer ${
              compared
                ? 'bg-[#C9A24B] border-[#C9A24B] text-[#2B1B14]'
                : 'bg-[#FFFBF5]/90 border-[#EADFCB] text-[#2B1B14] hover:border-[#C9A24B]'
            }`}
          >
            <Scale className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Twinkle Star Accent on Hover */}
        <motion.span
          animate={hovered ? { opacity: 1, scale: 1, rotate: 15 } : { opacity: 0, scale: 0.5, rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 z-10 text-[#F4D58D] drop-shadow pointer-events-none"
        >
          <Sparkles className="w-4 h-4" />
        </motion.span>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className={`text-[11px] uppercase tracking-[0.2em] font-medium truncate ${
              isDarkCard ? 'text-[#F4D58D]' : 'text-[#B8862B] dark:text-[#F4D58D]'
            }`}
          >
            {product.categoryLabel}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs tabular-nums shrink-0 ${
              isDarkCard ? 'text-[#FAF3E8]' : 'text-[#6B5B53] dark:text-[#DEC9C0]'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <Link
          to={`/product/${product.slug}`}
          className={`font-display text-base sm:text-lg font-semibold leading-snug line-clamp-2 mb-3 transition-colors ${
            isDarkCard
              ? 'text-[#FFFBF5] hover:text-[#F4D58D]'
              : 'text-[#2B1B14] dark:text-[#FBF4E9] hover:text-[#8B0A1A] dark:hover:text-[#F4D58D]'
          }`}
        >
          {product.name}
        </Link>

        {/* Low Stock Bar when stock < 20 */}
        {variant !== 'compact' && product.stock < 20 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className={isDarkCard ? 'text-[#F4D58D]' : 'text-[#8B0A1A] dark:text-[#F4D58D]'}>
                Only {product.stock} left
              </span>
              <span className={isDarkCard ? 'text-[#EADFCB]/70' : 'text-[#6B5B53]/70 dark:text-[#DEC9C0]/70'}>
                Selling fast
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#EADFCB]/40 dark:bg-[#562630] overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: Math.max(0.25, 1 - product.stock * 0.04) }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
                className="h-full bg-gold-gradient rounded-full"
              />
            </div>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-end justify-between gap-2 border-t border-[#EADFCB]/70 dark:border-[#562630]/80">
          <PriceDisplay
            pricePKR={product.pricePKR}
            oldPricePKR={product.oldPricePKR}
            size="sm"
            inverse={isDarkCard}
          />

          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.94 }}
            className="shine-sweep-parent min-h-[40px] px-3.5 py-2 rounded-lg bg-gold-gradient text-[#2B1B14] text-xs font-semibold tracking-wide uppercase inline-flex items-center gap-1.5 shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};
