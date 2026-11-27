import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Gift,
  Truck,
  MessageCircle,
  Star,
  Mail,
  Check,
  Instagram,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { LOOKBOOK_ITEMS } from '../../data/articles';
import { CUSTOMER_REVIEWS } from '../../data/reviews';
import { buildWhatsAppLink } from '../../config/store';
import { SectionHeading } from '../SectionHeading';
import { LuxuryImage } from '../LuxuryImage';

const OCCASIONS = [
  {
    name: 'Bridal',
    desc: 'Coordinated bridal crystal & gold sets',
    image: PRODUCTS[0].images[0],
    slug: 'Bridal',
  },
  {
    name: 'Party Wear',
    desc: 'Ruby locksets & black crystal suites',
    image: PRODUCTS[1].images[0],
    slug: 'Party Wear',
  },
  {
    name: 'Mehndi',
    desc: 'Golden sunburst stone jhumka earrings',
    image: PRODUCTS[7].images[0],
    slug: 'Mehndi',
  },
  {
    name: 'Festive',
    desc: 'Golden flower necklace & earring sets',
    image: PRODUCTS[8].images[0],
    slug: 'Festive',
  },
  {
    name: 'Gifts',
    desc: 'Crystal drop & ruby giftable sets',
    image: PRODUCTS[9].images[0],
    slug: 'Gifts',
  },
];

const WHY_ITEMS = [
  { icon: Sparkles, title: 'Premium Plating', desc: 'Rich gold-tone & silver-tone finishes crafted to shine.' },
  { icon: ShieldCheck, title: 'Anti-Tarnish Seal', desc: 'Protective polish designed for lasting brilliance.' },
  { icon: Gift, title: 'Gift Packaging', desc: 'Signature keepsake boxes ready for gifting.' },
  { icon: Truck, title: 'Cash on Delivery', desc: 'Pay safely at your doorstep anywhere across Pakistan.' },
  { icon: MessageCircle, title: '24/7 WhatsApp Support', desc: 'Live bridal styling, size checks, and order tracking.' },
];

const CountUpStat: React.FC<{ target: number; suffix: string; label: string }> = ({
  target,
  suffix,
  label,
}) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const totalFrames = 36;
    const id = window.setInterval(() => {
      frame += 1;
      setVal(Math.round((target * frame) / totalFrames));
      if (frame >= totalFrames) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center p-6 rounded-2xl bg-[#FFFBF5] dark:bg-[#33131C] border border-[#C9A24B]/40">
      <p className="font-display text-3xl sm:text-4xl font-bold text-[#8B0A1A] dark:text-[#F4D58D] tabular-nums">
        {val.toLocaleString()}
        {suffix}
      </p>
      <p className="text-xs uppercase tracking-[0.18em] text-[#6B5B53] dark:text-[#DEC9C0] mt-1.5 font-semibold">
        {label}
      </p>
    </div>
  );
};

export const HomeSectionsLower: React.FC = () => {
  const [reviewIdx, setReviewIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterFocus, setNewsletterFocus] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    const id = window.setInterval(() => {
      setReviewIdx((i) => (i + 1) % CUSTOMER_REVIEWS.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
  };

  const visibleReviews = [
    CUSTOMER_REVIEWS[reviewIdx % CUSTOMER_REVIEWS.length],
    CUSTOMER_REVIEWS[(reviewIdx + 1) % CUSTOMER_REVIEWS.length],
    CUSTOMER_REVIEWS[(reviewIdx + 2) % CUSTOMER_REVIEWS.length],
  ];

  const igProducts = PRODUCTS.slice(0, 6);

  return (
    <>
      {/* I) SHOP BY OCCASION + OPPOSITE MARQUEES (Ivory Mood) */}
      <section className="bg-[#FFFBF5] dark:bg-[#1D090E] py-16 lg:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Dress For The Moment"
            title="Shop by Occasion"
            shimmerWord="Occasion"
            viewAllTo="/collections"
            viewAllLabel="All Collections"
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5">
            {OCCASIONS.map((occ, idx) => (
              <motion.div
                key={occ.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className={idx === 0 ? 'col-span-2 md:col-span-1' : ''}
              >
                <Link
                  to={`/shop?occasion=${encodeURIComponent(occ.slug)}`}
                  className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-4 border border-[#C9A24B]/40 shadow-sm"
                >
                  <LuxuryImage
                    src={occ.image}
                    alt={occ.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/92 via-[#2B070E]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-semibold text-[#FFFBF5]">{occ.name}</h3>
                    <p className="text-xs text-[#F4D58D] mt-0.5 line-clamp-1">{occ.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dual Opposite Direction Heritage Marquee */}
        <div className="mt-14 space-y-3 border-y border-[#EADFCB] dark:border-[#562630] py-4 bg-[#F6EBD9]/45 dark:bg-[#290E15]">
          <div className="overflow-hidden">
            <div className="animate-marquee-rtl gap-8 text-xs uppercase tracking-[0.25em] font-semibold text-[#8B0A1A] dark:text-[#F4D58D]">
              {[...Array(2)].flatMap((_, k) =>
                ['Ruby Locksets', 'Crystal White Gold', 'Sunburst Jhumkay', 'Black Crystal Sets', 'Golden Flower Sets', 'Sialkot Heritage'].map(
                  (t, i) => (
                    <span key={`${k}-${i}`} className="inline-flex items-center gap-8 whitespace-nowrap">
                      <span>{t}</span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
                    </span>
                  )
                )
              )}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="animate-marquee-ltr gap-8 text-xs uppercase tracking-[0.25em] font-medium text-[#6B5B53] dark:text-[#DEC9C0]">
              {[...Array(2)].flatMap((_, k) =>
                ['Nikah', 'Mehndi & Mayun', 'Baraat Suite', 'Walima Reception', 'Eid Festive', 'Luxury Gifting'].map(
                  (t, i) => (
                    <span key={`${k}-${i}`} className="inline-flex items-center gap-8 whitespace-nowrap">
                      <span>{t}</span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-[#8B0A1A] dark:bg-[#C9A24B]" />
                    </span>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* J) TWO HALF-WIDTH PROMO CARDS (Champagne Mood) */}
      <section className="bg-[#F6EBD9] dark:bg-[#290E15] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ruby Promo Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#8B0A1A] to-[#4A0812] text-[#FFFBF5] p-8 sm:p-10 flex flex-col justify-between min-h-[290px] border border-[#C9A24B]/50 shadow-lg"
          >
            <div className="max-w-xs z-10">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#F4D58D] font-semibold">
                Curated Gifting
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-2 mb-3">
                Gift Sets Ready to Impress
              </h3>
              <p className="text-sm text-[#EADFCB] mb-6">
                Shop coordinated sets by budget — starting from Rs. 849 ($3.03) with gift packaging.
              </p>
              <Link
                to="/gift-guide"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-bold uppercase tracking-wider"
              >
                <span>Open Gift Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="hidden sm:block absolute right-4 bottom-4 w-44 h-52 rounded-xl overflow-hidden bg-[#FFFBF5] p-3 border-2 border-[#C9A24B]/60 shadow-2xl rotate-6">
              <LuxuryImage
                src={PRODUCTS[2].images[0]}
                alt={PRODUCTS[2].name}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Champagne Promo Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFFBF5] to-[#F1DFC2] dark:from-[#3A141D] dark:to-[#290E15] text-[#2B1B14] dark:text-[#FBF4E9] p-8 sm:p-10 flex flex-col justify-between min-h-[290px] border border-[#C9A24B]/60 shadow-lg"
          >
            <div className="max-w-xs z-10">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8862B] dark:text-[#F4D58D] font-semibold">
                Bespoke Atelier
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-2 mb-3">
                Custom Bridal Colour Matching
              </h3>
              <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mb-6">
                Share your wedding lehenga photo and our Sialkot team will match the right set for you.
              </p>
              <Link
                to="/custom-order"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B0A1A] text-white text-xs font-bold uppercase tracking-wider"
              >
                <span>Request Custom Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="hidden sm:block absolute right-4 bottom-4 w-44 h-52 rounded-xl overflow-hidden bg-[#FFFBF5] p-3 border-2 border-[#C9A24B]/60 shadow-2xl -rotate-6">
              <LuxuryImage
                src={PRODUCTS[4].images[0]}
                alt={PRODUCTS[4].name}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* K) LOOKBOOK GALLERY (Ivory Mood) */}
      <section className="bg-[#FFFBF5] dark:bg-[#1D090E] py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Editorial Showcase"
            title="The Royal Lookbook"
            shimmerWord="Lookbook"
            viewAllTo="/lookbook"
            viewAllLabel="Explore Lookbook"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOOKBOOK_ITEMS.map((look, idx) => (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, clipPath: 'inset(12% 0% 12% 0%)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.07 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-5 border border-[#C9A24B]/40 shadow-md"
              >
                <LuxuryImage
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/92 via-[#2B070E]/15 to-transparent pointer-events-none" />

                {/* Interactive Pulsing Shop-the-Look Dots */}
                {look.hotspots.map((dot, dIdx) => (
                  <Link
                    key={dIdx}
                    to={`/product/${dot.productSlug}`}
                    style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/dot z-10"
                    title={dot.label}
                  >
                    <span className="relative flex items-center justify-center w-6 h-6">
                      <span className="absolute inset-0 rounded-full bg-[#F4D58D] animate-ping opacity-60" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FFFBF5] border-2 border-[#8B0A1A] shadow-md" />
                    </span>
                    <span className="hidden group-hover/dot:block absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#3A0A12] text-[#F4D58D] text-[11px] font-semibold border border-[#C9A24B]/60 shadow-lg">
                      Shop {dot.label}
                    </span>
                  </Link>
                ))}

                <Link to={`/product/${look.productSlug}`} className="absolute bottom-4 left-4 right-4 block">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4D58D] font-semibold">
                    {look.occasion}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#FFFBF5]">{look.title}</h3>
                  <p className="text-xs text-[#EADFCB]/85 mt-0.5">{look.subtitle}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* L) WHY CHOOSE US + COUNT-UP STATS (Champagne Mood) */}
      <section className="bg-[#F6EBD9] dark:bg-[#290E15] py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeading
            label="The Hassan Standard"
            title="Why Discerning Brides Choose Us"
            shimmerWord="Choose"
            viewAllTo="/about"
            viewAllLabel="Our Story"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
            {WHY_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="p-6 rounded-2xl bg-[#FFFBF5] dark:bg-[#33131C] border border-[#EADFCB] dark:border-[#562630] hover:border-[#C9A24B] transition-colors"
                >
                  <motion.div
                    initial={{ scale: 0.75, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="w-12 h-12 rounded-xl bg-[#F6EBD9] dark:bg-[#290E15] border border-[#C9A24B]/50 flex items-center justify-center text-[#8B0A1A] dark:text-[#F4D58D] mb-4"
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <CountUpStat target={5000} suffix="+" label="Happy Customers Across Pakistan" />
            <CountUpStat target={10} suffix="" label="Curated Signature Daraz Sets" />
            <CountUpStat target={100} suffix="%" label="Quality & Satisfaction Promise" />
          </div>
        </div>
      </section>

      {/* M) CUSTOMER REVIEWS CAROUSEL (Ivory Mood) */}
      <section className="bg-[#FFFBF5] dark:bg-[#1D090E] py-16 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-[#B8862B] dark:text-[#F4D58D] font-semibold mb-2">
                Verified Praise
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                Loved Across <span className="text-gold-shimmer">Pakistan</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setReviewIdx((i) => (i - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length)
                }
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/60 flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setReviewIdx((i) => (i + 1) % CUSTOMER_REVIEWS.length)}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border border-[#C9A24B]/60 flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <Link
                to="/reviews"
                className="ml-2 text-xs font-semibold uppercase tracking-wider text-[#8B0A1A] dark:text-[#F4D58D] hover:underline"
              >
                All Reviews
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-6 rounded-2xl bg-[#FFFBF5]/90 dark:bg-[#33131C]/90 backdrop-blur-md border border-[#C9A24B]/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9A24B] mb-4">
                    {Array.from({ length: rev.rating }).map((_, sIdx) => (
                      <motion.span
                        key={sIdx}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: sIdx * 0.07 }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-sm text-[#2B1B14] dark:text-[#FBF4E9] leading-relaxed mb-5">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-gradient text-[#2B1B14] font-display font-bold text-sm flex items-center justify-center shrink-0">
                      {rev.initials}
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                        {rev.name}
                      </p>
                      <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                        {rev.city} · Verified Buyer
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* N) WHATSAPP BANNER (Ruby/Gold Gradient Mood) */}
      <section className="relative bg-gradient-to-r from-[#5A0F1C] via-[#8B0A1A] to-[#4A0D18] text-[#FFFBF5] py-14 lg:py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-[#F4D58D] font-semibold mb-2">
              Personal Concierge
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">
              Order Your Favorite Design on <span className="text-gold-shimmer">WhatsApp</span>
            </h2>
            <p className="text-sm sm:text-base text-[#EADFCB]">
              Send us a screenshot, ask for close-up photos in natural daylight, or place an instant Cash
              on Delivery order at +92 329 8025766.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={buildWhatsAppLink('Assalam-o-Alaikum Hassan Artificial Jewellery! I would like to order a design on WhatsApp.')}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shine-sweep-parent min-h-[52px] px-8 py-4 rounded-xl bg-gold-gradient text-[#2B1B14] font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2.5 shadow-2xl"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* O) INSTAGRAM-STYLE PHOTO GRID (Ivory Mood) */}
      <section className="bg-[#FFFBF5] dark:bg-[#1D090E] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeading
            label="@HassanArtificialJewellery"
            title="Shop Our Featured Showcase"
            shimmerWord="Showcase"
            viewAllTo="/lookbook"
            viewAllLabel="View Lookbook"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {igProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#FFFBF5] p-2.5 border border-[#EADFCB] dark:border-[#562630]"
              >
                <LuxuryImage
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#3A0A12]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#F4D58D]">
                  <Instagram className="w-6 h-6" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* P) NEWSLETTER (Champagne Mood) */}
      <section className="bg-[#F6EBD9] dark:bg-[#290E15] py-16 lg:py-24">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl bg-[#FFFBF5] dark:bg-[#33131C] border-2 border-[#C9A24B]/60 p-8 sm:p-12 text-center shadow-xl">
            <motion.div
              animate={newsletterFocus ? { scale: 1.15, rotate: -6 } : { scale: 1, rotate: 0 }}
              className="w-14 h-14 mx-auto rounded-2xl bg-[#F6EBD9] dark:bg-[#290E15] border border-[#C9A24B] flex items-center justify-center text-[#8B0A1A] dark:text-[#F4D58D] mb-5"
            >
              {newsletterSubmitted ? <Check className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
            </motion.div>

            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B8862B] dark:text-[#F4D58D] font-semibold">
              Private Atelier List
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-3">
              Receive New Bridal Drops &amp; Eid Previews
            </h2>
            <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] max-w-md mx-auto mb-7">
              Join our inner circle for early access to new necklace sets, jhumkay, and exclusive festive
              offers.
            </p>

            {newsletterSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F6EBD9] dark:bg-[#290E15] border border-[#C9A24B] text-sm font-semibold text-[#8B0A1A] dark:text-[#F4D58D]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Thank you for joining Hassan Artificial Jewellery!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletter} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onFocus={() => setNewsletterFocus(true)}
                    onBlur={() => setNewsletterFocus(false)}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for newsletter"
                    className="flex-1 h-12 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#C9A24B]/60 text-sm text-[#2B1B14] dark:text-[#FBF4E9] focus:outline-none focus:border-[#8B0A1A]"
                  />
                  <button
                    type="submit"
                    className="shine-sweep-parent h-12 px-6 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-[#8B0A1A] dark:text-[#F4D58D] mt-2 text-left">
                    {newsletterError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
