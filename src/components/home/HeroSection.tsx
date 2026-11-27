import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RefreshCw,
  Gift,
  Award,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { formatDualPrice } from '../../config/store';
import { useStore } from '../../context/StoreContext';
import { LuxuryImage } from '../LuxuryImage';
import { TravelingProductLane } from './TravelingProductLane';

interface HeroSlide {
  id: number;
  bannerSrc: string;
  bannerAlt: string;
  eyebrow: string;
  headline: string;
  shimmerWord: string;
  subtext: string;
  ctaLabel: string;
  ctaTo: string;
  product: Product;
}

const pRubyGold = PRODUCTS[2]; // Ruby Gold Crystal Jewellery Set - Rs. 999
const pBridal = PRODUCTS[0]; // Necklace Set With Earrings - Rs. 1,000
const pRoyalSuite = PRODUCTS[6]; // Black Crystal Jewellery Set - Rs. 1,299

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    bannerSrc: './assets/banners/hero-1.png',
    bannerAlt: 'Hassan Artificial Jewellery Ruby and Gold Necklaces Banner',
    eyebrow: 'Signature Collection',
    headline: 'Ruby & Gold Necklaces',
    shimmerWord: 'Ruby',
    subtext:
      'Rich ruby-red crystals paired with intricate 24K gold-tone detailing for weddings and festive evenings.',
    ctaLabel: 'Shop Now',
    ctaTo: `/product/${pRubyGold.slug}`,
    product: pRubyGold,
  },
  {
    id: 2,
    bannerSrc: './assets/banners/hero-2.png',
    bannerAlt: 'Hassan Artificial Jewellery Bridal Elegance Banner',
    eyebrow: 'Hassan Bridal Atelier',
    headline: 'Bridal Elegance',
    shimmerWord: 'Bridal',
    subtext:
      'Coordinated bridal necklace and earring suites designed to crown your Nikah, Baraat, and Walima.',
    ctaLabel: 'Shop Now',
    ctaTo: `/product/${pBridal.slug}`,
    product: pBridal,
  },
  {
    id: 3,
    bannerSrc: './assets/banners/hero-3.png',
    bannerAlt: 'Hassan Artificial Jewellery Royal Purple Collection Banner',
    eyebrow: 'Reception & Festive Edition',
    headline: 'Royal Purple Collection',
    shimmerWord: 'Royal',
    subtext:
      'Statement crystal suites with sparkling accents and keepsake packaging, delivered across Pakistan.',
    ctaLabel: 'Shop Now',
    ctaTo: `/product/${pRoyalSuite.slug}`,
    product: pRoyalSuite,
  },
];

const TRUST_ITEMS = [
  { icon: Award, title: 'Premium Quality', desc: 'Gold-plated & crystal artistry' },
  { icon: Truck, title: 'Cash on Delivery', desc: 'Nationwide across Pakistan' },
  { icon: RefreshCw, title: 'Easy Exchange', desc: 'Hassle-free 7-day support' },
  { icon: Gift, title: 'Gift Packaging', desc: 'Signature keepsake boxes' },
  { icon: ShieldCheck, title: 'Fast Delivery', desc: 'Dispatched within 24 hours' },
];

const SPARKLES = [
  { left: '14%', top: '18%', delay: 0, duration: 4.8 },
  { left: '34%', top: '26%', delay: 1.1, duration: 5.4 },
  { left: '52%', top: '14%', delay: 0.6, duration: 4.4 },
  { left: '68%', top: '24%', delay: 1.7, duration: 5.2 },
  { left: '84%', top: '18%', delay: 0.9, duration: 4.9 },
  { left: '91%', top: '48%', delay: 2.0, duration: 5.6 },
];

const FLOATING_CHIPS = [
  { label: 'Gold Plated', icon: Sparkles, duration: 3.6, yOffset: -4, delay: 0 },
  { label: 'Anti-Tarnish', icon: ShieldCheck, duration: 4.5, yOffset: 4, delay: 0.35 },
  { label: 'Gift Ready', icon: Gift, duration: 5.2, yOffset: -3.5, delay: 0.7 },
];

export const HeroSection: React.FC = () => {
  const { currency } = useStore();
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const parallaxY = useSpring(mouseY, { stiffness: 90, damping: 24 });

  const slide = HERO_SLIDES[index];
  const price = formatDualPrice(slide.product.pricePKR, currency);
  const words = slide.headline.split(' ');

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(-nx * 16);
    mouseY.set(-ny * 10);
  };

  const handleMouseLeave = () => {
    setPaused(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const goPrev = () => setIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const goNext = () => setIndex((prev) => (prev + 1) % HERO_SLIDES.length);

  return (
    <section className="relative overflow-hidden bg-[#FFFBF5] dark:bg-[#1D090E]">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative w-full"
      >
        {/* Full-Width 8:3 Banner Stage */}
        <div className="relative w-full aspect-[8/3] min-h-[175px] sm:min-h-[260px] lg:min-h-[540px] overflow-hidden bg-[#F6EBD9] dark:bg-[#290E15]">
          <motion.div
            style={prefersReducedMotion ? undefined : { x: parallaxX, y: parallaxY }}
            className="absolute -inset-2 sm:-inset-3"
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 1, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <motion.img
                  src={slide.bannerSrc}
                  alt={slide.bannerAlt}
                  loading={slide.id === 1 ? 'eager' : 'lazy'}
                  fetchPriority={slide.id === 1 ? 'high' : 'auto'}
                  initial={prefersReducedMotion ? { scale: 1 } : { scale: 1 }}
                  animate={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 6,
                    ease: 'linear',
                  }}
                  className="w-full h-full object-cover object-center select-none"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Soft ivory bottom scrim ONLY behind the desktop glass panel */}
          {panelVisible && (
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FFFBF5]/45 via-[#FFFBF5]/15 to-transparent pointer-events-none"
            />
          )}

          {/* Gold Shimmer Sweep crossing once per slide change */}
          {!prefersReducedMotion && (
            <AnimatePresence>
              <motion.div
                key={`sweep-${slide.id}`}
                aria-hidden="true"
                initial={{ x: '-120%', opacity: 0.75 }}
                animate={{ x: '180%', opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#F4D58D]/45 to-transparent pointer-events-none"
              />
            </AnimatePresence>
          )}

          {/* Subtle Gold Sparkle Particles over banner */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {SPARKLES.map((dot, i) => (
                <motion.span
                  key={i}
                  style={{ left: dot.left, top: dot.top }}
                  animate={{
                    y: [0, -14, 0],
                    opacity: [0.2, 0.85, 0.2],
                    scale: [0.8, 1.15, 0.8],
                  }}
                  transition={{
                    duration: dot.duration,
                    repeat: Infinity,
                    delay: dot.delay,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#F4D58D] shadow-[0_0_8px_#F4D58D]"
                />
              ))}
            </div>
          )}

          {/* Show Toggle Button when Panel is Hidden (Desktop Overlay) */}
          <AnimatePresence>
            {!panelVisible && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className="hidden lg:flex absolute bottom-4 right-6 z-20"
              >
                <button
                  type="button"
                  onClick={() => setPanelVisible(true)}
                  aria-label="Show hero info panel"
                  className="min-h-[44px] px-4 py-2 rounded-full bg-[rgba(255,251,245,0.84)] backdrop-blur-[14px] border border-[#C9A24B] text-[#2B1B14] text-xs font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(201,162,75,0.3)] inline-flex items-center gap-2 hover:bg-[#FFFBF5] active:scale-[0.97] transition-transform cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#8B0A1A]" />
                  <span>Show Panel</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Frosted Ivory Glass Panel: Below banner on Mobile/Tablet, Anchored Bottom Strip on Desktop */}
        <div
          className={`${
            panelVisible ? 'block' : 'lg:hidden'
          } px-3 sm:px-6 lg:px-0 py-3 sm:py-4 lg:py-0 bg-[#F6EBD9]/55 dark:bg-[#290E15] lg:bg-transparent`}
        >
          {/* Mobile/Tablet Restore Button when Hidden */}
          {!panelVisible && (
            <div className="flex justify-center lg:hidden">
              <button
                type="button"
                onClick={() => setPanelVisible(true)}
                className="min-h-[44px] px-5 py-2 rounded-full bg-[rgba(255,251,245,0.88)] backdrop-blur-[14px] border border-[#C9A24B] text-[#2B1B14] text-xs font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-2 active:scale-[0.97] cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#8B0A1A]" />
                <span>Show Details</span>
              </button>
            </div>
          )}

          <AnimatePresence>
            {panelVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { y: 24, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 230, damping: 24 }}
                className="lg:absolute lg:bottom-4 lg:left-6 lg:right-6 z-20 rounded-[24px] bg-[rgba(255,251,245,0.72)] backdrop-blur-[14px] border border-[#C9A24B]/70 shadow-[0_14px_38px_-10px_rgba(201,162,75,0.34),0_4px_18px_rgba(58,10,18,0.12)] px-4 py-3.5 sm:px-5 sm:py-3.5 lg:min-h-[154px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5 lg:gap-4"
              >
                {/* Left Content Area */}
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">
                  {/* Top Row: Gold Label + Floating Chips + Mobile Hide Toggle */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#7A4F0B] whitespace-nowrap">
                        {slide.eyebrow}
                      </span>

                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {FLOATING_CHIPS.map((chip) => {
                          const ChipIcon = chip.icon;
                          return (
                            <motion.span
                              key={chip.label}
                              animate={
                                prefersReducedMotion
                                  ? undefined
                                  : { y: [0, chip.yOffset, 0] }
                              }
                              transition={{
                                duration: chip.duration,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                                delay: chip.delay,
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBF5]/85 border border-[#C9A24B]/55 text-[11px] font-semibold text-[#2B1B14] shadow-xs whitespace-nowrap"
                            >
                              <ChipIcon className="w-3 h-3 text-[#8B0A1A]" />
                              <span>{chip.label}</span>
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPanelVisible(false)}
                      aria-label="Hide hero info panel"
                      className="lg:hidden min-h-[44px] min-w-[44px] px-3 rounded-full bg-[#FFFBF5]/80 border border-[#C9A24B]/60 text-[11px] font-bold uppercase tracking-wider text-[#2B1B14] inline-flex items-center justify-center gap-1.5 active:scale-[0.97] cursor-pointer"
                    >
                      <EyeOff className="w-3.5 h-3.5 text-[#8B0A1A]" />
                      <span>Hide</span>
                    </button>
                  </div>

                  {/* Middle Row: Mask-Reveal Headline + Subtext */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-${slide.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="min-w-0"
                    >
                      <h1 className="font-display text-2xl sm:text-[26px] xl:text-[30px] font-semibold leading-tight text-[#2B1B14] tracking-tight text-balance">
                        {words.map((word, wIdx) => (
                          <span
                            key={wIdx}
                            className="inline-block overflow-hidden mr-[0.24em] align-bottom"
                          >
                            <motion.span
                              initial={
                                prefersReducedMotion ? { opacity: 1, y: 0 } : { y: '100%', opacity: 0 }
                              }
                              animate={{ y: '0%', opacity: 1 }}
                              transition={{
                                duration: prefersReducedMotion ? 0 : 0.45,
                                delay: prefersReducedMotion ? 0 : wIdx * 0.07,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className={`inline-block ${
                                word === slide.shimmerWord
                                  ? 'text-gold-shimmer brightness-[0.82] contrast-125'
                                  : ''
                              }`}
                            >
                              {word}
                            </motion.span>
                          </span>
                        ))}
                      </h1>
                      <p className="text-xs sm:text-[13px] text-[#3D2920] leading-snug line-clamp-2 lg:line-clamp-1 mt-0.5 max-w-2xl">
                        {slide.subtext}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Traveling Product Showcase Lane (between subtext and buttons) */}
                  <TravelingProductLane />

                  {/* Bottom Row: CTAs + Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
                    <motion.div
                      key={`ctas-${slide.id}`}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.94, y: 6 }
                      }
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.36,
                        delay: prefersReducedMotion ? 0 : 0.24,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex flex-wrap items-center gap-2.5"
                    >
                      <Link
                        to={slide.ctaTo}
                        className="shine-sweep-parent min-h-[44px] px-4 xl:px-5 py-2 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.97] transition-all inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>{slide.ctaLabel}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/shop"
                        className="shine-sweep-parent min-h-[44px] px-3.5 xl:px-4 py-2 rounded-xl border border-[#B8862B] bg-[#FFFBF5]/75 hover:bg-[#F6EBD9] text-[#2B1B14] text-xs font-bold uppercase tracking-wider active:scale-[0.97] transition-all inline-flex items-center whitespace-nowrap"
                      >
                        Browse All {PRODUCTS.length} Designs
                      </Link>
                    </motion.div>

                    {/* Slide Controls: Arrows + 01/03 Counter + Gold Progress Bar */}
                    <div className="flex items-center gap-2 w-full sm:w-auto sm:min-w-[185px] xl:min-w-[225px]">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#B8862B]/70 bg-[#FFFBF5]/85 text-[#2B1B14] hover:bg-[#F6EBD9] active:scale-[0.95] flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next slide"
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#B8862B]/70 bg-[#FFFBF5]/85 text-[#2B1B14] hover:bg-[#F6EBD9] active:scale-[0.95] flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-bold tabular-nums tracking-widest text-[#2B1B14] whitespace-nowrap shrink-0">
                        0{index + 1} / 0{HERO_SLIDES.length}
                      </span>

                      <div className="flex-1 min-w-[48px] h-[3px] rounded-full bg-[#C9A24B]/30 overflow-hidden">
                        <motion.div
                          key={`${slide.id}-${paused}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: paused || prefersReducedMotion ? 0.4 : 1 }}
                          transition={{
                            duration: paused || prefersReducedMotion ? 0.2 : 6,
                            ease: 'linear',
                          }}
                          style={{ transformOrigin: 'left' }}
                          className="h-full bg-gold-gradient"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Zone: 3D Flip Product Card + Desktop Hide Toggle */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div style={{ perspective: '900px' }} className="flex-1 lg:flex-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`card-${slide.id}`}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, rotateY: 24, scale: 0.96 }
                        }
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, rotateY: -20, scale: 0.96 }
                        }
                        transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={`/product/${slide.product.slug}`}
                          className="group min-h-[44px] flex items-center gap-3 p-2.5 rounded-2xl bg-[#FFFBF5]/90 border border-[#C9A24B]/65 shadow-sm hover:shadow-md hover:border-[#8B0A1A]/50 active:scale-[0.98] transition-all lg:w-[244px] xl:w-[288px]"
                        >
                          <div className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-xl bg-[#FFFBF5] border border-[#EADFCB] p-1 shrink-0 overflow-hidden">
                            <LuxuryImage
                              src={slide.product.images[0]}
                              alt={slide.product.name}
                              loading={slide.id === 1 ? 'eager' : 'lazy'}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#7A4F0B] truncate">
                              Featured Piece
                            </p>
                            <p className="font-display text-sm font-semibold text-[#2B1B14] leading-snug line-clamp-1 group-hover:text-[#8B0A1A] transition-colors">
                              {slide.product.name}
                            </p>
                            <div className="flex items-baseline gap-2 mt-0.5 tabular-nums">
                              <span className="text-sm font-bold text-[#8B0A1A]">
                                {price.primary}
                              </span>
                              <span className="text-xs font-medium text-[#4E3B33]">
                                {price.secondary}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPanelVisible(false)}
                    aria-label="Hide hero info panel"
                    title="Hide panel to view full banner"
                    className="hidden lg:inline-flex min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl bg-[#FFFBF5]/85 hover:bg-[#FFFBF5] border border-[#C9A24B]/65 text-[11px] font-bold uppercase tracking-wider text-[#2B1B14] flex-col items-center justify-center gap-0.5 active:scale-[0.96] transition-all cursor-pointer shrink-0"
                  >
                    <EyeOff className="w-4 h-4 text-[#8B0A1A]" />
                    <span>Hide</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-[#FFFBF5] dark:bg-[#1D090E] border-y border-[#EADFCB] dark:border-[#562630]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : idx * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#F6EBD9] dark:bg-[#33131C] border border-[#C9A24B]/40 flex items-center justify-center text-[#B8862B] dark:text-[#F4D58D] shrink-0">
                  <Icon className="w-4.5 h-4.5" strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] truncate">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
