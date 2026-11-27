import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { STORE_INFO, formatPKR, formatUSD, formatDualPrice, buildWhatsAppLink } from '../config/store';
import { useStore } from '../context/StoreContext';
import { LuxuryImage } from './LuxuryImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    cartSubtotalPKR,
    currency,
  } = useStore();
  const navigate = useNavigate();

  const freeProgress = Math.min(100, (cartSubtotalPKR / STORE_INFO.freeDeliveryThresholdPKR) * 100);
  const remainingPKR = Math.max(0, STORE_INFO.freeDeliveryThresholdPKR - cartSubtotalPKR);
  const subtotalFormatted = formatDualPrice(cartSubtotalPKR, currency);
  const remainingFormatted = formatDualPrice(remainingPKR, currency);

  const handleWhatsAppCart = () => {
    const lines = cart
      .map((item) => {
        const p = PRODUCTS.find((prod) => prod.id === item.productId);
        if (!p) return '';
        const rowPKR = p.pricePKR * item.quantity;
        return `• ${p.name} | Color: ${item.selectedColor} | Qty: ${item.quantity} | Price: ${formatPKR(rowPKR)} (${formatUSD(rowPKR)})`;
      })
      .filter(Boolean)
      .join('\n');

    const msg = `Assalam-o-Alaikum Hassan Artificial Jewellery!\nI would like to order:\n\n${lines}\n\nSubtotal: ${formatPKR(cartSubtotalPKR)} (${formatUSD(cartSubtotalPKR)})`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1D090E]/55 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#FFFBF5] dark:bg-[#290E15] border-l border-[#C9A24B]/40 shadow-2xl flex flex-col h-full z-10"
            aria-label="Shopping Bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EADFCB] dark:border-[#562630]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#B8862B]" />
                <h2 className="font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  Your Jewellery Bag
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close bag"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Progress */}
            <div className="px-5 py-3 bg-[#F6EBD9]/70 dark:bg-[#33131C] border-b border-[#EADFCB] dark:border-[#562630]">
              <p className="text-xs font-medium text-[#2B1B14] dark:text-[#FBF4E9] mb-1.5">
                {remainingPKR === 0 ? (
                  <span className="text-[#8B0A1A] dark:text-[#F4D58D] font-semibold">
                    Unlocked: Complimentary Insured Delivery Across Pakistan!
                  </span>
                ) : (
                  <>
                    Add <span className="font-semibold">{remainingFormatted.primary}</span> (
                    {remainingFormatted.secondary}) more for Free Delivery
                  </>
                )}
              </p>
              <div className="h-1.5 w-full rounded-full bg-[#EADFCB] dark:bg-[#562630] overflow-hidden">
                <div
                  style={{ width: `${freeProgress}%` }}
                  className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#F6EBD9] dark:bg-[#33131C] flex items-center justify-center text-[#B8862B] mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="font-display text-xl text-[#2B1B14] dark:text-[#FBF4E9] mb-1">
                    Your bag is currently empty
                  </p>
                  <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mb-6 max-w-xs">
                    Explore handcrafted Kundan bridal sets, pearl jhumkay, and zircon treasures.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-semibold uppercase tracking-wider"
                  >
                    Explore Boutique
                  </Link>
                </div>
              ) : (
                cart.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId);
                  if (!product) return null;
                  const itemPrice = formatDualPrice(product.pricePKR * item.quantity, currency);

                  return (
                    <div
                      key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-3.5 p-3 rounded-xl bg-white dark:bg-[#33131C] border border-[#EADFCB] dark:border-[#562630]"
                    >
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 rounded-lg overflow-hidden bg-[#FFFBF5] p-1 border border-[#EADFCB] shrink-0"
                      >
                        <LuxuryImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-display text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] leading-snug line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.productId, item.selectedColor, item.selectedSize)
                            }
                            aria-label="Remove item"
                            className="text-[#6B5B53] hover:text-[#8B0A1A] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#6B5B53] dark:text-[#DEC9C0] mt-0.5 truncate">
                          {item.selectedColor} · {item.selectedSize}
                        </p>
                        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center border border-[#EADFCB] dark:border-[#562630] rounded-lg">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQty(
                                  item.productId,
                                  item.selectedColor,
                                  item.selectedSize,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold tabular-nums text-[#2B1B14] dark:text-[#FBF4E9]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQty(
                                  item.productId,
                                  item.selectedColor,
                                  item.selectedSize,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center text-[#2B1B14] dark:text-[#FBF4E9] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9] tabular-nums">
                              {itemPrice.primary}
                            </p>
                            <p className="text-[11px] text-[#6B5B53] dark:text-[#DEC9C0] tabular-nums">
                              {itemPrice.secondary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#EADFCB] dark:border-[#562630] bg-[#FFFBF5] dark:bg-[#290E15] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-[#6B5B53] dark:text-[#DEC9C0]">
                    Subtotal
                  </span>
                  <div className="text-right">
                    <p className="font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] tabular-nums">
                      {subtotalFormatted.primary}
                    </p>
                    <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0] tabular-nums">
                      {subtotalFormatted.secondary}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="shine-sweep-parent w-full h-12 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCart}
                  className="w-full h-11 rounded-xl border border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#F6EBD9] dark:hover:bg-[#33131C] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#B8862B]" />
                  <span>Order Bag on WhatsApp</span>
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
