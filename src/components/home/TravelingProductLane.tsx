import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'motion/react';
import { Gem, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { formatDualPrice } from '../../config/store';
import { useStore } from '../../context/StoreContext';

const DIRECTION_DURATION_MS = 9000;
const SPIN_DURATION_MS = 4000;
const DEPTH_PERIOD_MS = 5400;
const BOB_PERIOD_MS = 2400;

const BURST_PARTICLES = [
  { x: -34, y: -26, mobile: true },
  { x: 36, y: -24, mobile: true },
  { x: -40, y: 12, mobile: false },
  { x: 40, y: 14, mobile: false },
  { x: 0, y: -38, mobile: true },
  { x: 0, y: 30, mobile: true },
];

const FOLLOWER_SPARKLES = [
  { offsetX: -30, offsetY: -34, size: 'w-2 h-2', mobile: true, phase: 0 },
  { offsetX: 34, offsetY: -22, size: 'w-1.5 h-1.5', mobile: false, phase: 1.4 },
  { offsetX: -24, offsetY: 16, size: 'w-1.5 h-1.5', mobile: false, phase: 2.6 },
];

function computeKinematics(
  elapsedMs: number,
  minX: number,
  maxX: number
): { x: number; y: number; scale: number; opacity: number; glowOpacity: number; rotateY: number; rotateZ: number } {
  const clamped = Math.max(0, elapsedMs);
  const cyclePos = (clamped % (DIRECTION_DURATION_MS * 2)) / DIRECTION_DURATION_MS;
  const u = cyclePos < 1 ? cyclePos : 2 - cyclePos;
  // Smooth easeInOut curve
  const eased = 0.5 - 0.5 * Math.cos(Math.PI * u);
  const x = minX + eased * (maxX - minX);

  // Sine wave vertical bob (~18px peak-to-peak: -9px to +9px)
  const y = Math.sin((clamped / BOB_PERIOD_MS) * Math.PI * 2) * 9;

  // Depth wave: forward (scale 1.15, brighter) <-> backward (scale 0.75, softer)
  const depthWave = Math.sin((clamped / DEPTH_PERIOD_MS) * Math.PI * 2);
  const scale = 0.95 + 0.2 * depthWave;
  const opacity = 0.87 + 0.13 * depthWave;
  const glowOpacity = 0.25 + 0.55 * ((depthWave + 1) / 2);

  // Continuous 3D spin (360deg every 4s) and gentle tilt (-10deg to +10deg)
  const rotateY = ((clamped / SPIN_DURATION_MS) * 360) % 360;
  const rotateZ = Math.sin((clamped / 3200) * Math.PI * 2) * 10;

  return { x, y, scale, opacity, glowOpacity, rotateY, rotateZ };
}

interface MedallionThumbProps {
  product: Product;
  imgFailed: boolean;
  onError: () => void;
}

const MedallionThumb: React.FC<MedallionThumbProps> = ({ product, imgFailed, onError }) => {
  if (imgFailed || !product.images[0]) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4D58D]/65 via-[#FFFBF5] to-[#C9A24B]/45 text-[#8B0A1A]">
        <Gem className="w-6 h-6" strokeWidth={1.6} />
      </div>
    );
  }
  return (
    <img
      src={product.images[0]}
      alt={product.name}
      loading="eager"
      referrerPolicy="no-referrer"
      onError={onError}
      className="w-full h-full object-cover object-center select-none"
    />
  );
};

export const TravelingProductLane: React.FC = () => {
  const { currency } = useStore();
  const prefersReducedMotion = useReducedMotion();

  const laneRef = useRef<HTMLDivElement | null>(null);
  const boundsRef = useRef({ minX: 4, maxX: 160, isMobile: false });
  const elapsedRef = useRef(0);
  const halfCycleRef = useRef(0);
  const tabHiddenRef = useRef(typeof document !== 'undefined' ? document.hidden : false);

  const [productIdx, setProductIdx] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Main unit motion values
  const x = useMotionValue(4);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const glowOpacity = useMotionValue(0.55);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  // Trail copy motion values (lagging behind main medallion)
  const t1X = useMotionValue(4);
  const t1Y = useMotionValue(0);
  const t1Scale = useMotionValue(0.95);
  const t1Opacity = useMotionValue(0);

  const t2X = useMotionValue(4);
  const t2Y = useMotionValue(0);
  const t2Scale = useMotionValue(0.9);
  const t2Opacity = useMotionValue(0);

  const t3X = useMotionValue(4);
  const t3Y = useMotionValue(0);
  const t3Scale = useMotionValue(0.85);
  const t3Opacity = useMotionValue(0);

  // Measure lane width cleanly via ResizeObserver
  useEffect(() => {
    const el = laneRef.current;
    if (!el) return;

    const updateBounds = () => {
      const width = el.clientWidth;
      const isMobile = window.innerWidth < 640;
      const unitWidth = isMobile ? 136 : 176;
      const minX = 4;
      const maxX = Math.max(minX, width - unitWidth - 4);
      boundsRef.current = { minX, maxX, isMobile };

      if (prefersReducedMotion) {
        y.set(0);
      }
    };

    updateBounds();
    const ro = new ResizeObserver(updateBounds);
    ro.observe(el);
    window.addEventListener('resize', updateBounds);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateBounds);
    };
  }, [prefersReducedMotion, y]);

  // Pause animation when browser tab is hidden
  useEffect(() => {
    const onVisibilityChange = () => {
      tabHiddenRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Frame loop using transform & opacity motion values only
  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || tabHiddenRef.current) return;

    // Cap delta to prevent large jumps right after tab restore
    const safeDelta = Math.min(delta, 50);
    elapsedRef.current += safeDelta;
    const t = elapsedRef.current;
    const { minX, maxX, isMobile } = boundsRef.current;

    const halfCycle = Math.floor(t / DIRECTION_DURATION_MS);
    if (halfCycle !== halfCycleRef.current) {
      halfCycleRef.current = halfCycle;
      setProductIdx((prev) => (prev + 1) % PRODUCTS.length);
      setBurstKey((prev) => prev + 1);
    }

    const main = computeKinematics(t, minX, maxX);
    x.set(main.x);
    y.set(main.y);
    scale.set(main.scale);
    opacity.set(main.opacity);
    glowOpacity.set(main.glowOpacity);
    rotateY.set(main.rotateY);
    rotateZ.set(main.rotateZ);

    const k1 = computeKinematics(t - 180, minX, maxX);
    t1X.set(k1.x);
    t1Y.set(k1.y);
    t1Scale.set(k1.scale * 0.94);
    t1Opacity.set(t > 180 ? (isMobile ? 0.18 : 0.28) : 0);

    const k2 = computeKinematics(t - 360, minX, maxX);
    t2X.set(k2.x);
    t2Y.set(k2.y);
    t2Scale.set(k2.scale * 0.88);
    t2Opacity.set(t > 360 ? (isMobile ? 0.08 : 0.16) : 0);

    const k3 = computeKinematics(t - 540, minX, maxX);
    t3X.set(k3.x);
    t3Y.set(k3.y);
    t3Scale.set(k3.scale * 0.82);
    t3Opacity.set(t > 540 && !isMobile ? 0.08 : 0);
  });

  const activeProduct = PRODUCTS[productIdx];
  const price = formatDualPrice(activeProduct.pricePKR, currency);

  return (
    <div
      ref={laneRef}
      aria-label="Featured jewellery showcase lane"
      className="relative w-full h-[134px] sm:h-[156px] lg:h-[160px] pointer-events-none select-none overflow-hidden my-0.5"
    >
      {/* Faint Motion Trail Copies (3 desktop, 2 mobile) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden="true"
            style={{
              x: t3X,
              y: t3Y,
              scale: t3Scale,
              opacity: t3Opacity,
              willChange: 'transform, opacity',
            }}
            className="hidden sm:flex absolute top-2.5 left-0 w-[176px] flex-col items-center pointer-events-none"
          >
            <div className="w-[110px] h-[110px] rounded-full border border-[#C9A24B]/50 bg-[#FFFBF5]/70 overflow-hidden">
              <MedallionThumb
                product={activeProduct}
                imgFailed={Boolean(failedImages[activeProduct.id])}
                onError={() => setFailedImages((p) => ({ ...p, [activeProduct.id]: true }))}
              />
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            style={{
              x: t2X,
              y: t2Y,
              scale: t2Scale,
              opacity: t2Opacity,
              willChange: 'transform, opacity',
            }}
            className="flex absolute top-2.5 left-0 w-[136px] sm:w-[176px] flex-col items-center pointer-events-none"
          >
            <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full border border-[#C9A24B]/60 bg-[#FFFBF5]/80 overflow-hidden">
              <MedallionThumb
                product={activeProduct}
                imgFailed={Boolean(failedImages[activeProduct.id])}
                onError={() => setFailedImages((p) => ({ ...p, [activeProduct.id]: true }))}
              />
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            style={{
              x: t1X,
              y: t1Y,
              scale: t1Scale,
              opacity: t1Opacity,
              willChange: 'transform, opacity',
            }}
            className="flex absolute top-2.5 left-0 w-[136px] sm:w-[176px] flex-col items-center pointer-events-none"
          >
            <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full border border-[#C9A24B]/70 bg-[#FFFBF5]/85 overflow-hidden">
              <MedallionThumb
                product={activeProduct}
                imgFailed={Boolean(failedImages[activeProduct.id])}
                onError={() => setFailedImages((p) => ({ ...p, [activeProduct.id]: true }))}
              />
            </div>
          </motion.div>
        </>
      )}

      {/* Main Moving Product Unit */}
      <motion.div
        style={
          prefersReducedMotion
            ? {
                left: '50%',
                x: '-50%',
                willChange: 'transform',
              }
            : {
                x,
                y,
                scale,
                opacity,
                perspective: 1000,
                willChange: 'transform, opacity',
              }
        }
        animate={prefersReducedMotion ? { y: [-3, 3, -3] } : undefined}
        transition={
          prefersReducedMotion
            ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
        className="absolute top-2.5 left-0 w-[136px] sm:w-[176px] flex flex-col items-center pointer-events-none z-10"
      >
        {/* Depth-Reactive Soft Gold Glow */}
        <motion.div
          aria-hidden="true"
          style={prefersReducedMotion ? undefined : { opacity: glowOpacity }}
          className="absolute -top-2 w-[96px] h-[96px] sm:w-[128px] sm:h-[128px] rounded-full bg-radial from-[#F4D58D]/75 via-[#C9A24B]/35 to-transparent pointer-events-none"
        />

        {/* Follower Tiny Sparkles */}
        {!prefersReducedMotion &&
          FOLLOWER_SPARKLES.map((sp, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              style={{ left: `calc(50% + ${sp.offsetX}px)`, top: `calc(42px + ${sp.offsetY}px)` }}
              animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.7, 1.25, 0.7] }}
              transition={{ duration: 2.2 + i * 0.5, repeat: Infinity, delay: sp.phase }}
              className={`${sp.mobile ? 'block' : 'hidden sm:block'} absolute ${sp.size} text-[#B8862B] pointer-events-none`}
            >
              <Sparkles className="w-full h-full fill-[#F4D58D]" />
            </motion.span>
          ))}

        {/* Quick Sparkle Burst on End-of-Lane Swap */}
        {!prefersReducedMotion && burstKey > 0 && (
          <div
            key={burstKey}
            aria-hidden="true"
            className="absolute top-[40px] sm:top-[55px] left-1/2 pointer-events-none"
          >
            {BURST_PARTICLES.map((bp, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                animate={{ x: bp.x, y: bp.y, scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`${bp.mobile ? 'block' : 'hidden sm:block'} absolute w-2 h-2 -ml-1 -mt-1 rotate-45 bg-[#F4D58D] border border-[#8B0A1A]/50`}
              />
            ))}
          </div>
        )}

        {/* Clickable Product Medallion + Glass Price Tag */}
        <Link
          to={`/product/${activeProduct.slug}`}
          aria-label={`View ${activeProduct.name} - ${price.primary}`}
          className="pointer-events-auto group flex flex-col items-center focus-visible:outline-2 focus-visible:outline-[#C9A24B] rounded-2xl"
        >
          {/* 3D Spinning Circle Medallion */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                    rotateY,
                    rotateZ,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }
            }
            className="relative w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full p-[2px] bg-gradient-to-br from-[#F4D58D] via-[#C9A24B] to-[#8B0A1A]/70 shadow-[0_8px_22px_rgba(58,10,18,0.22)] group-hover:scale-105 transition-transform duration-200"
          >
            <div className="relative w-full h-full rounded-full bg-[#FFFBF5] overflow-hidden border border-[#FFFBF5]/80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.84 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.84 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <MedallionThumb
                    product={activeProduct}
                    imgFailed={Boolean(failedImages[activeProduct.id])}
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [activeProduct.id]: true }))
                    }
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle Shine Sweep across the medallion */}
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: '-140%' }}
                  animate={{ x: '220%' }}
                  transition={{
                    duration: 1.15,
                    repeat: Infinity,
                    repeatDelay: 2.8,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none"
                />
              )}
            </div>
          </motion.div>

          {/* Small Glass Tag Following Under the Medallion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${activeProduct.id}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="-mt-2.5 sm:-mt-3 relative z-10 px-2.5 py-1 rounded-xl bg-[rgba(255,251,245,0.92)] backdrop-blur-md border border-[#C9A24B]/75 shadow-[0_4px_12px_rgba(43,27,20,0.14)] text-center max-w-[136px] sm:max-w-[174px]"
            >
              <p className="font-display text-[10px] sm:text-[11px] font-semibold text-[#2B1B14] truncate leading-tight">
                {activeProduct.name}
              </p>
              <p className="text-[10px] font-bold text-[#8B0A1A] tabular-nums leading-tight mt-0.5 whitespace-nowrap">
                {price.primary}{' '}
                <span className="font-medium text-[#4E3B33]">· {price.secondary}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </Link>
      </motion.div>
    </div>
  );
};
