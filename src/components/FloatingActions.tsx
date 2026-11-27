import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { STORE_INFO, buildWhatsAppLink } from '../config/store';

export const FloatingActions: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Desktop Floating WhatsApp + Back-to-Top */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-center gap-3">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full bg-[#FFFBF5] dark:bg-[#33131C] border border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D] shadow-lg flex items-center justify-center cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={buildWhatsAppLink('Assalam-o-Alaikum Hassan Artificial Jewellery! I need assistance choosing a jewellery set.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative group w-14 h-14 rounded-full bg-[#8B0A1A] border-2 border-[#F4D58D] text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <span className="absolute inset-0 rounded-full bg-[#C9A24B] animate-pulse-ring pointer-events-none" />
          <MessageCircle className="w-6 h-6 relative z-10" />
        </a>
      </div>

      {/* Mobile Sticky Bottom WhatsApp / Call Bar (compact <= 52px so total sticky < 15%) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-12 bg-[#3A0A12]/95 backdrop-blur-md border-t border-[#C9A24B]/50 grid grid-cols-2 divide-x divide-[#C9A24B]/30">
        <a
          href={buildWhatsAppLink('Assalam-o-Alaikum Hassan Artificial Jewellery! I would like to order.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4D58D]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
        <a
          href={`tel:${STORE_INFO.phoneRaw}`}
          className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFFBF5]"
        >
          <Phone className="w-4 h-4 text-[#F4D58D]" />
          <span>Call Atelier</span>
        </a>
      </div>
    </>
  );
};
