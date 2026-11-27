import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { STORE_INFO, buildWhatsAppLink } from '../config/store';
import { JEWELLERY_IMAGES } from '../data/images';
import { FAQ_ITEMS } from '../data/articles';
import { CUSTOMER_REVIEWS, CustomerReview } from '../data/reviews';
import { PRODUCTS } from '../data/products';
import { LuxuryImage } from '../components/LuxuryImage';

export const AboutPage: React.FC = () => (
  <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen">
    <section className="bg-[#F6EBD9] dark:bg-[#290E15] py-16 lg:py-24 border-b border-[#EADFCB] dark:border-[#562630]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs uppercase tracking-[0.22em] text-[#B8862B] font-semibold">
            Heritage From Sialkot, Punjab
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-5">
            About <span className="text-gold-shimmer">Hassan Artificial Jewellery</span>
          </h1>
          <p className="text-base text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed mb-4">
            Born in Sialkot, Punjab, Hassan Artificial Jewellery was founded on a clear promise: every
            Pakistani bride and modern woman deserves fine-jewellery radiance, museum-grade Kundan and
            Zircon detailing, and trustworthy service without exorbitant gold prices.
          </p>
          <p className="text-base text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed mb-8">
            From luminous 24K micron gold-plated bridal chokers to waterproof daily wear cuffs, every
            piece passes strict quality inspection before leaving our studio in signature velvet boxes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="px-7 py-3.5 rounded-xl bg-[#8B0A1A] text-white text-xs font-bold uppercase tracking-wider"
            >
              Explore Collection
            </Link>
            <Link
              to="/custom-order"
              className="px-6 py-3.5 rounded-xl border border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D] text-xs font-bold uppercase tracking-wider"
            >
              Custom Bridal Order
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-4 border border-[#C9A24B]">
            <LuxuryImage
              src={JEWELLERY_IMAGES.bridalSet}
              alt="Necklace Set With Earrings"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFBF5] p-4 border border-[#C9A24B] mt-6">
            <LuxuryImage
              src={JEWELLERY_IMAGES.earringsJhumkay}
              alt="Golden Stone Jhumka Earrings"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Hassan Artificial Jewellery Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${STORE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
            Contact Our Atelier
          </h1>
          <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
            Whether you are selecting a Nikah bridal set, checking bangle sizing, or tracking a parcel,
            our Sialkot concierge responds swiftly.
          </p>

          <div className="space-y-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-[#F6EBD9]/55 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] flex items-center gap-3.5">
              <Phone className="w-5 h-5 text-[#8B0A1A] dark:text-[#F4D58D] shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0]">
                  Phone &amp; WhatsApp
                </p>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9]"
                >
                  {STORE_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EBD9]/55 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] flex items-center gap-3.5">
              <Mail className="w-5 h-5 text-[#8B0A1A] dark:text-[#F4D58D] shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0]">
                  Email
                </p>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9] break-all"
                >
                  {STORE_INFO.email}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F6EBD9]/55 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] flex items-center gap-3.5">
              <MapPin className="w-5 h-5 text-[#8B0A1A] dark:text-[#F4D58D] shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0]">
                  Location
                </p>
                <p className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  {STORE_INFO.location}
                </p>
              </div>
            </div>
          </div>

          <a
            href={buildWhatsAppLink('Assalam-o-Alaikum Hassan Artificial Jewellery!')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-xl bg-gold-gradient text-[#2B1B14] font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message on WhatsApp</span>
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#290E15] border border-[#C9A24B]/50 shadow-lg space-y-5"
        >
          <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
            Send an Email Message
          </h2>
          {sent && (
            <div className="p-3.5 rounded-xl bg-[#F6EBD9] dark:bg-[#33131C] border border-[#C9A24B] text-xs font-semibold text-[#8B0A1A] dark:text-[#F4D58D]">
              Your email client is opening to send directly to {STORE_INFO.email}.
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
              Your Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
              Message *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-8 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Send to {STORE_INFO.email}
          </button>
        </form>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            Help &amp; Guidance
          </span>
          <h1 className="font-display text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className="rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8862B] font-semibold block mb-1">
                      {item.category}
                    </span>
                    <span className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B8862B] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed overflow-hidden"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC = () => (
  <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
          Boutique Policies
        </span>
        <h1 className="font-display text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
          Shipping &amp; 7-Day Exchange Policy
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
          <Truck className="w-6 h-6 text-[#8B0A1A] dark:text-[#F4D58D] mb-3" />
          <h2 className="font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
            Delivery Across Pakistan
          </h2>
          <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
            Free delivery on orders above Rs. 5,000 ($18). Standard Rs. 250 courier fee below Rs. 5,000.
            Delivered in 1–4 working days from Sialkot.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
          <RefreshCw className="w-6 h-6 text-[#8B0A1A] dark:text-[#F4D58D] mb-3" />
          <h2 className="font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
            Easy 7-Day Exchange
          </h2>
          <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
            Need a different bangle size or received transit damage? Message WhatsApp +923298025766
            within 7 days with an unboxing video for quick replacement.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
          <ShieldCheck className="w-6 h-6 text-[#8B0A1A] dark:text-[#F4D58D] mb-3" />
          <h2 className="font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-2">
            Flexible Payments
          </h2>
          <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] leading-relaxed">
            Pay via Cash on Delivery, Bank Transfer (IBFT), JazzCash, or Easypaisa with transparent
            PKR and USD pricing.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [name, setName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [comment, setComment] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    const initials = name
      .trim()
      .split(' ')
      .map((s) => s[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setReviews((prev) => [
      {
        id: `rev-${Date.now()}`,
        name: name.trim(),
        city,
        rating: 5,
        productName: 'Verified Purchase',
        date: 'November 2026',
        comment: comment.trim(),
        initials,
        verified: true,
      },
      ...prev,
    ]);
    setName('');
    setComment('');
  };

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            5,000+ Happy Brides &amp; Customers
          </span>
          <h1 className="font-display text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            Customer Reviews
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-[#C9A24B] mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#2B1B14] dark:text-[#FBF4E9] leading-relaxed mb-4">
                  “{rev.comment}”
                </p>
              </div>
              <div className="pt-3 border-t border-[#EADFCB] dark:border-[#562630] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-gradient text-[#2B1B14] font-bold text-xs flex items-center justify-center">
                  {rev.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#2B1B14] dark:text-[#FBF4E9]">
                    {rev.name}
                  </p>
                  <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                    {rev.city} · Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleAdd}
          className="max-w-xl p-6 rounded-2xl bg-[#F6EBD9]/55 dark:bg-[#290E15] border border-[#C9A24B]/50 space-y-4"
        >
          <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
            Share Your Experience
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="h-11 px-4 rounded-xl bg-white dark:bg-[#1D090E] border border-[#EADFCB] text-sm"
            />
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City (e.g. Lahore)"
              className="h-11 px-4 rounded-xl bg-white dark:bg-[#1D090E] border border-[#EADFCB] text-sm"
            />
          </div>
          <textarea
            rows={3}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-4 rounded-xl bg-white dark:bg-[#1D090E] border border-[#EADFCB] text-sm"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-xl bg-[#8B0A1A] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => (
  <div className="min-h-[70vh] bg-[#FFFBF5] dark:bg-[#1D090E] flex flex-col items-center justify-center px-4 py-16 text-center">
    <img
      src={STORE_INFO.logoPath}
      alt={STORE_INFO.name}
      className="h-24 w-auto mb-6 mix-blend-multiply dark:bg-[#FFFBF5] dark:p-3 dark:rounded-2xl"
    />
    <span className="text-xs uppercase tracking-[0.22em] text-[#B8862B] font-semibold">
      Error 404
    </span>
    <h1 className="font-display text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2 mb-3">
      Page Not Found
    </h1>
    <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] max-w-md mb-8">
      The piece or page you are looking for may have moved. Return to our boutique to explore all{' '}
      {PRODUCTS.length} curated designs.
    </p>
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        to="/"
        className="px-7 py-3.5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-bold uppercase tracking-wider"
      >
        Return Home
      </Link>
      <Link
        to="/shop"
        className="px-7 py-3.5 rounded-xl border border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D] text-xs font-bold uppercase tracking-wider"
      >
        Shop All Jewellery
      </Link>
    </div>
  </div>
);
