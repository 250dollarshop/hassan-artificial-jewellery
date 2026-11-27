import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../config/store';
import { useStore } from '../context/StoreContext';
import { LuxuryImage } from './LuxuryImage';

export const GlobalEffects: React.FC = () => {
  const { toasts, flyingItem, theme } = useStore();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 24, restDelta: 0.001 });

  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !sessionStorage.getItem('haj_splash_done');
    } catch {
      return false;
    }
  });

  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [watermarkOffset, setWatermarkOffset] = useState(0);

  useEffect(() => {
    if (!showSplash) return;
    const t = window.setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem('haj_splash_done', '1');
      } catch {
        // ignore storage errors
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, [showSplash]);

  // Desktop sparkle cursor trail (disabled on touch)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let lastTime = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 45) return;
      lastTime = now;
      const id = now + Math.random();
      setCursorTrail((prev) => [...prev.slice(-6), { x: e.clientX, y: e.clientY, id }]);
      window.setTimeout(() => {
        setCursorTrail((prev) => prev.filter((p) => p.id !== id));
      }, 450);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Roaming watermark parallax
  useEffect(() => {
    const onScroll = () => setWatermarkOffset(window.scrollY * 0.08);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Scroll Progress Gold Line */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold-gradient z-[70] pointer-events-none"
      />

      {/* Roaming Faint Brand Logo Watermark (light sections only, hidden in dark mode) */}
      {theme === 'light' && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block"
        >
          <motion.img
            src={STORE_INFO.logoPath}
            alt=""
            animate={{
              x: ['62vw', '8vw', '68vw'],
              y: ['14vh', '46vh', '14vh'],
            }}
            transition={{ duration: 48, repeat: Infinity, ease: 'easeInOut' }}
            style={{ translateY: -(watermarkOffset % 160) }}
            className="w-[380px] opacity-[0.06] mix-blend-multiply select-none"
          />
        </div>
      )}

      {/* Desktop Gold Sparkle Cursor Trail */}
      <div className="fixed inset-0 pointer-events-none z-[80]" aria-hidden="true">
        <AnimatePresence>
          {cursorTrail.map((pt) => (
            <motion.span
              key={pt.id}
              initial={{ opacity: 0.75, scale: 0.9 }}
              animate={{ opacity: 0, scale: 0.1, y: -8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ left: pt.x - 4, top: pt.y - 4 }}
              className="fixed w-2 h-2 rounded-full bg-[#C9A24B] shadow-[0_0_8px_#F4D58D]"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Curved Fly-to-Cart Product Image */}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            key={flyingItem.id}
            initial={{
              position: 'fixed',
              left: flyingItem.fromX - 24,
              top: flyingItem.fromY - 24,
              scale: 1,
              opacity: 1,
              zIndex: 90,
            }}
            animate={{
              left: [flyingItem.fromX - 24, (flyingItem.fromX + flyingItem.toX) / 2, flyingItem.toX - 14],
              top: [flyingItem.fromY - 24, Math.min(flyingItem.fromY, flyingItem.toY) - 90, flyingItem.toY - 14],
              scale: [1, 0.7, 0.25],
              opacity: [1, 0.95, 0.2],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A24B] shadow-xl pointer-events-none bg-[#FFFBF5]"
          >
            <img src={flyingItem.image} alt="" className="w-full h-full object-contain p-1" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-[75] flex flex-col gap-2.5 max-w-[340px] w-[calc(100vw-2rem)] pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.28 }}
              className="pointer-events-auto flex items-center gap-3 p-3 rounded-xl bg-[#FFFBF5] dark:bg-[#33131C] border border-[#C9A24B]/60 shadow-2xl"
            >
              {toast.image ? (
                <div className="w-11 h-11 rounded-lg bg-[#FFFBF5] border border-[#EADFCB] shrink-0 overflow-hidden">
                  <LuxuryImage
                    src={toast.image}
                    alt={toast.title}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-[#2B1B14] shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] truncate">
                  {toast.title}
                </p>
                {toast.subtitle && (
                  <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] truncate">{toast.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 1.2s Initial Luxury Loading Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-[#FFFBF5] flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center"
            >
              <div className="relative p-4 shine-sweep-parent">
                <img
                  src={STORE_INFO.logoPath}
                  alt={STORE_INFO.name}
                  className="h-28 sm:h-36 w-auto object-contain mix-blend-multiply"
                />
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="absolute -top-2 right-4 text-[#C9A24B]"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.span>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="absolute bottom-2 left-4 text-[#8B0A1A]"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="w-44 h-[2px] bg-gold-gradient mt-4 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
