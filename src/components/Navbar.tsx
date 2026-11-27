import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Scale,
  ArrowRight,
} from 'lucide-react';
import { STORE_INFO, formatDualPrice } from '../config/store';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { LuxuryImage } from './LuxuryImage';

const ANNOUNCEMENTS = [
  'Free Delivery above Rs. 5,000 / $18',
  'Cash on Delivery Across Pakistan',
  'Easy 7-Day Exchange',
  'Premium Gold-Plated Finish',
];

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    theme,
    toggleTheme,
    cartCount,
    setIsCartOpen,
    cartWiggleKey,
    wishlist,
    compareList,
    setIsCompareOpen,
    cartIconRef,
  } = useStore();

  const navigate = useNavigate();
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.occasion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1.5 text-[13px] font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors ${
      isActive
        ? 'text-[#8B0A1A] dark:text-[#F4D58D]'
        : 'text-[#2B1B14] dark:text-[#FBF4E9] hover:text-[#8B0A1A] dark:hover:text-[#F4D58D]'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* A) Announcement Bar */}
      <div className="bg-[#3A0A12] text-[#FFFBF5] h-8 px-4 flex items-center justify-center border-b border-[#C9A24B]/30 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={announcementIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#F4D58D] font-medium text-center truncate"
          >
            {ANNOUNCEMENTS[announcementIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* B) Main Sticky Glass Navbar */}
      <div
        className={`relative border-b border-[#C9A24B]/40 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFBF5]/95 dark:bg-[#1D090E]/95 shadow-md py-1.5'
            : 'bg-[#FFFBF5]/88 dark:bg-[#1D090E]/88 py-2.5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger + Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center shrink-0" aria-label={STORE_INFO.name}>
              <div
                className={`flex items-center justify-center rounded-lg transition-all ${
                  theme === 'dark' ? 'bg-[#FFFBF5] px-2 py-0.5 border border-[#C9A24B]/60' : ''
                }`}
              >
                <img
                  src={STORE_INFO.logoPath}
                  alt={STORE_INFO.name}
                  className={`w-auto object-contain transition-all duration-300 ${
                    theme === 'light' ? 'mix-blend-multiply' : ''
                  } ${scrolled ? 'h-[42px] sm:h-[50px]' : 'h-[46px] sm:h-[60px]'}`}
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Home</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            {/* Shop with Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => setShopMegaOpen(true)}
              onMouseLeave={() => setShopMegaOpen(false)}
            >
              <NavLink to="/shop" className={navLinkClass}>
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-1">
                    <span>Shop</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-75" />
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                      />
                    )}
                  </span>
                )}
              </NavLink>

              <AnimatePresence>
                {shopMegaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 ${
                      CATEGORIES.length <= 3 ? 'w-[500px]' : 'w-[780px]'
                    }`}
                  >
                    <div className="rounded-2xl bg-[#FFFBF5] dark:bg-[#290E15] border border-[#C9A24B]/40 shadow-2xl p-6">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#EADFCB] dark:border-[#562630]">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
                          Curated Categories
                        </span>
                        <Link
                          to="/shop"
                          onClick={() => setShopMegaOpen(false)}
                          className="text-xs font-semibold text-[#8B0A1A] dark:text-[#F4D58D] inline-flex items-center gap-1 hover:underline"
                        >
                          View all {PRODUCTS.length} designs <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <div className={`grid gap-3 ${CATEGORIES.length <= 3 ? 'grid-cols-3' : 'grid-cols-5'}`}>
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.slug}
                            to={`/category/${cat.slug}`}
                            onClick={() => setShopMegaOpen(false)}
                            className="group flex flex-col items-center text-center p-2.5 rounded-xl hover:bg-[#F6EBD9]/70 dark:hover:bg-[#3A141D] transition-colors"
                          >
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#EADFCB] dark:border-[#562630] mb-2 bg-[#FFFBF5] p-1.5">
                              <LuxuryImage
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <span className="text-xs font-medium text-[#2B1B14] dark:text-[#FBF4E9] group-hover:text-[#8B0A1A] dark:group-hover:text-[#F4D58D] leading-tight">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-[#6B5B53] dark:text-[#DEC9C0]/75">
                              {cat.itemCount} items
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/bridal" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Bridal</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/collections" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Collections</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/new-arrivals" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>New Arrivals</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/sale" className={navLinkClass}>
              {({ isActive }) => (
                <span className="inline-flex items-center gap-1.5">
                  <span>Sale</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded bg-[#8B0A1A] text-white leading-none">
                    HOT
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </span>
              )}
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>About</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Contact</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-gradient rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search jewellery"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] transition-colors cursor-pointer"
            >
              {searchOpen ? <X className="w-4.5 h-4.5" /> : <Search className="w-4.5 h-4.5" />}
            </button>

            {/* PKR / USD Currency Switch */}
            <div
              className="inline-flex items-center rounded-lg border border-[#C9A24B]/50 bg-[#F6EBD9]/70 dark:bg-[#33131C] p-0.5 text-[11px] font-semibold"
              role="group"
              aria-label="Currency selector"
            >
              <button
                type="button"
                onClick={() => setCurrency('PKR')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  currency === 'PKR'
                    ? 'bg-gold-gradient text-[#2B1B14] shadow-xs'
                    : 'text-[#6B5B53] dark:text-[#DEC9C0]'
                }`}
              >
                PKR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  currency === 'USD'
                    ? 'bg-gold-gradient text-[#2B1B14] shadow-xs'
                    : 'text-[#6B5B53] dark:text-[#DEC9C0]'
                }`}
              >
                USD
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark burgundy mode' : 'Switch to ivory light mode'}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-[#2B1B14] dark:text-[#F4D58D] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Compare */}
            {compareList.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCompareOpen(true)}
                aria-label="Compare selected items"
                className="relative hidden md:flex w-10 h-10 items-center justify-center rounded-full text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] transition-colors cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C9A24B] text-[#2B1B14] text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] transition-colors"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#8B0A1A] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-[#2B1B14] dark:text-[#FBF4E9] hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] transition-colors"
            >
              <User className="w-4.5 h-4.5" />
            </Link>

            {/* Cart Button with Animated Counter & Wiggle */}
            <motion.button
              ref={cartIconRef}
              key={cartWiggleKey}
              animate={cartWiggleKey > 0 ? { rotate: [0, -14, 12, -8, 4, 0], scale: [1, 1.18, 1] } : {}}
              transition={{ duration: 0.45 }}
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping bag"
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F6EBD9] dark:bg-[#33131C] border border-[#C9A24B]/50 text-[#2B1B14] dark:text-[#F4D58D] hover:border-[#C9A24B] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#8B0A1A] text-white text-[10px] font-bold tabular-nums flex items-center justify-center shadow"
              >
                {cartCount}
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Expanding Live Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#EADFCB] dark:border-[#562630] bg-[#FFFBF5] dark:bg-[#290E15] overflow-hidden"
            >
              <div className="max-w-[720px] mx-auto px-4 py-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="w-4 h-4 text-[#B8862B] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Ruby Lockset, Black Crystal, Jhumka Earrings..."
                    className="w-full h-11 pl-11 pr-24 rounded-xl bg-white dark:bg-[#33131C] border border-[#C9A24B]/50 text-sm text-[#2B1B14] dark:text-[#FBF4E9] placeholder:text-[#6B5B53]/65 focus:outline-none focus:border-[#8B0A1A]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 h-8 px-4 rounded-lg bg-gold-gradient text-[#2B1B14] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Search
                  </button>
                </form>

                {searchResults.length > 0 && (
                  <div className="mt-3 divide-y divide-[#EADFCB] dark:divide-[#562630] rounded-xl border border-[#EADFCB] dark:border-[#562630] bg-white dark:bg-[#33131C] overflow-hidden">
                    {searchResults.map((p) => {
                      const price = formatDualPrice(p.pricePKR, currency);
                      return (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 p-2.5 hover:bg-[#F6EBD9]/50 dark:hover:bg-[#3E1722] transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#FFFBF5] p-1 border border-[#EADFCB] shrink-0 overflow-hidden">
                            <LuxuryImage
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] truncate">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-[#B8862B] uppercase tracking-wider">
                              {p.categoryLabel}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] tabular-nums">
                              {price.primary}
                            </p>
                            <p className="text-[11px] text-[#6B5B53] dark:text-[#DEC9C0] tabular-nums">
                              {price.secondary}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[85] bg-[#FFFBF5] dark:bg-[#1D090E] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EADFCB] dark:border-[#562630]">
              <img
                src={STORE_INFO.logoPath}
                alt={STORE_INFO.name}
                className={`h-11 w-auto object-contain ${
                  theme === 'dark' ? 'bg-[#FFFBF5] rounded-md px-2 py-0.5' : 'mix-blend-multiply'
                }`}
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="w-11 h-11 rounded-full border border-[#EADFCB] dark:border-[#562630] flex items-center justify-center text-[#2B1B14] dark:text-[#F4D58D] cursor-pointer"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 rounded-full bg-[#F6EBD9] dark:bg-[#33131C] flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-1 flex-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop All Jewellery' },
                { to: '/bridal', label: 'Bridal Collection' },
                { to: '/collections', label: 'Curated Collections' },
                { to: '/new-arrivals', label: 'New Arrivals' },
                { to: '/sale', label: 'Flash Sale & Offers' },
                { to: '/gift-guide', label: 'Gift Guide' },
                { to: '/lookbook', label: 'Bridal Lookbook' },
                { to: '/size-guide', label: 'Ring & Bangle Size Guide' },
                { to: '/custom-order', label: 'Custom Bridal Order' },
                { to: '/track-order', label: 'Track Order' },
                { to: '/account', label: 'My Account' },
                { to: '/about', label: 'Our Story' },
                { to: '/contact', label: 'Contact Us' },
              ].map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-[#EADFCB]/60 dark:border-[#562630]/60 font-display text-lg text-[#2B1B14] dark:text-[#FBF4E9]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
