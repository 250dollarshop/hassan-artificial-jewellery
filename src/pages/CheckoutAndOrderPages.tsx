import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  Package,
  Search,
  MessageCircle,
  Heart,
  User,
  MapPin,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import {
  PAKISTANI_CITIES,
  STORE_INFO,
  formatDualPrice,
  buildWhatsAppLink,
} from '../config/store';
import { useStore } from '../context/StoreContext';
import { PriceDisplay } from '../components/PriceDisplay';
import { LuxuryImage } from '../components/LuxuryImage';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotalPKR, currency, placeOrder } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash on Delivery');
  const [error, setError] = useState('');

  const deliveryFeePKR =
    cartSubtotalPKR >= STORE_INFO.freeDeliveryThresholdPKR || cartSubtotalPKR === 0
      ? 0
      : STORE_INFO.standardDeliveryFeePKR;
  const totalPKR = cartSubtotalPKR + deliveryFeePKR;

  const subtotalDual = formatDualPrice(cartSubtotalPKR, currency);
  const deliveryDual = formatDualPrice(deliveryFeePKR, currency);
  const totalDual = formatDualPrice(totalPKR, currency);

  if (cart.length === 0) {
    return (
      <div className="min-h-[65vh] bg-[#FFFBF5] dark:bg-[#1D090E] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-3">
          Your Bag is Empty
        </h1>
        <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mb-6">
          Add handcrafted jewellery to your bag before checking out.
        </p>
        <Link
          to="/shop"
          className="px-7 py-3.5 rounded-xl bg-gold-gradient text-[#2B1B14] text-xs font-bold uppercase tracking-wider"
        >
          Browse Store
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please complete your full name, phone number, and delivery address.');
      return;
    }
    setError('');
    const items = cart
      .map((c) => {
        const p = PRODUCTS.find((prod) => prod.id === c.productId);
        if (!p) return null;
        return {
          productId: p.id,
          name: p.name,
          image: p.images[0],
          pricePKR: p.pricePKR,
          quantity: c.quantity,
          selectedColor: c.selectedColor,
          selectedSize: c.selectedSize,
        };
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x));

    const order = placeOrder({
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city,
      address: address.trim(),
      paymentMethod,
      currency,
      subtotalPKR: cartSubtotalPKR,
      deliveryFeePKR,
      totalPKR,
      items,
    });
    navigate(`/order-confirmation/${order.id}`);
  };

  const paymentOptions = [
    { id: 'Cash on Delivery', desc: 'Pay cash at your doorstep across Pakistan', icon: Banknote },
    { id: 'Bank Transfer', desc: 'Direct IBFT bank account transfer', icon: CreditCard },
    { id: 'JazzCash', desc: 'Instant mobile wallet payment', icon: Smartphone },
    { id: 'Easypaisa', desc: 'Fast Easypaisa mobile transfer', icon: Smartphone },
  ];

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-12">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[
            { num: 1, label: 'Delivery Details' },
            { num: 2, label: 'Payment & Confirm' },
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <button
                type="button"
                onClick={() => setStep(s.num as 1 | 2)}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <span
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${
                    step >= s.num
                      ? 'bg-[#8B0A1A] text-white'
                      : 'bg-[#F6EBD9] dark:bg-[#33131C] text-[#6B5B53]'
                  }`}
                >
                  {s.num}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  {s.label}
                </span>
              </button>
              {i === 0 && <span className="w-12 h-[2px] bg-[#C9A24B]/50" />}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] shadow-sm">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
              Shipping &amp; Payment
            </h1>

            {error && (
              <div className="p-3.5 rounded-xl bg-[#8B0A1A]/10 border border-[#8B0A1A] text-xs font-medium text-[#8B0A1A] dark:text-[#F4D58D]">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setStep(1);
                  }}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm text-[#2B1B14] dark:text-[#FBF4E9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm text-[#2B1B14] dark:text-[#FBF4E9]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm text-[#2B1B14] dark:text-[#FBF4E9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                  City (Pakistan) *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm text-[#2B1B14] dark:text-[#FBF4E9]"
                >
                  {PAKISTANI_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B53] dark:text-[#DEC9C0] mb-1.5">
                Complete Delivery Address *
              </label>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House number, street, sector/phase, nearby landmark"
                className="w-full p-4 rounded-xl bg-[#FFFBF5] dark:bg-[#1D090E] border border-[#EADFCB] dark:border-[#562630] text-sm text-[#2B1B14] dark:text-[#FBF4E9]"
              />
            </div>

            {/* Payment Method Cards */}
            <div className="pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
              <h2 className="font-display text-xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-4">
                Select Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(opt.id);
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        active
                          ? 'border-[#8B0A1A] bg-[#F6EBD9]/70 dark:bg-[#33131C] shadow-sm'
                          : 'border-[#EADFCB] dark:border-[#562630] hover:border-[#C9A24B]'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#B8862B] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-[#2B1B14] dark:text-[#FBF4E9]">
                          {opt.id}
                        </p>
                        <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#F6EBD9]/65 dark:bg-[#290E15] border border-[#C9A24B]/50 space-y-5 sticky top-28">
            <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => {
                const p = PRODUCTS.find((prod) => prod.id === item.productId);
                if (!p) return null;
                return (
                  <div
                    key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex items-center gap-3 pb-3 border-b border-[#EADFCB] dark:border-[#562630]"
                  >
                    <div className="w-14 h-16 rounded-lg bg-[#FFFBF5] p-1 border border-[#EADFCB] shrink-0 overflow-hidden">
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
                      <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                        Qty {item.quantity} · {item.selectedColor}
                      </p>
                    </div>
                    <PriceDisplay pricePKR={p.pricePKR * item.quantity} size="sm" />
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <span className="text-[#6B5B53] dark:text-[#DEC9C0]">Subtotal</span>
                <span className="font-semibold tabular-nums text-[#2B1B14] dark:text-[#FBF4E9]">
                  {subtotalDual.primary} ({subtotalDual.secondary})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B5B53] dark:text-[#DEC9C0]">Delivery ({city})</span>
                <span className="font-semibold tabular-nums text-[#8B0A1A] dark:text-[#F4D58D]">
                  {deliveryFeePKR === 0 ? 'FREE' : `${deliveryDual.primary} (${deliveryDual.secondary})`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#C9A24B]/40">
                <span className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  Total Payable
                </span>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold tabular-nums text-[#8B0A1A] dark:text-[#F4D58D]">
                    {totalDual.primary}
                  </p>
                  <p className="text-xs tabular-nums text-[#6B5B53] dark:text-[#DEC9C0]">
                    {totalDual.secondary}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="shine-sweep-parent w-full h-13 rounded-xl bg-[#8B0A1A] hover:bg-[#6E0714] text-white font-bold text-sm uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Confirm Order ({paymentMethod})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, currency } = useStore();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const totalDual = formatDualPrice(order.totalPKR, currency);

  const sendWhatsAppReceipt = () => {
    const lines = order.items
      .map((i) => `• ${i.name} (${i.selectedColor}) x${i.quantity}`)
      .join('\n');
    const msg = `Assalam-o-Alaikum Hassan Artificial Jewellery!\nI just placed Order #${order.id}.\nName: ${order.customerName}\nCity: ${order.city}\nPayment: ${order.paymentMethod}\nTotal: ${totalDual.primary} (${totalDual.secondary})\nItems:\n${lines}`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14 px-4">
      <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-[#290E15] border-2 border-[#C9A24B]/60 p-8 sm:p-10 text-center shadow-xl">
        <img
          src={STORE_INFO.logoPath}
          alt={STORE_INFO.name}
          className="h-14 w-auto mx-auto mb-6 mix-blend-multiply dark:bg-[#FFFBF5] dark:p-2 dark:rounded-xl"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="w-16 h-16 mx-auto rounded-full bg-gold-gradient flex items-center justify-center text-[#2B1B14] mb-4"
        >
          <CheckCircle2 className="w-9 h-9" />
        </motion.div>

        <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
          Thank You for Your Order
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-1 mb-2">
          Order #{order.id} Confirmed
        </h1>
        <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mb-8">
          Our Sialkot atelier team is carefully quality-checking and velvet-packing your pieces for
          dispatch to {order.city}.
        </p>

        <div className="text-left rounded-2xl bg-[#F6EBD9]/50 dark:bg-[#33131C] border border-[#EADFCB] dark:border-[#562630] p-5 space-y-3 mb-7 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6B5B53] dark:text-[#DEC9C0]">Recipient</span>
            <span className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
              {order.customerName} ({order.phone})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5B53] dark:text-[#DEC9C0]">Payment Method</span>
            <span className="font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5B53] dark:text-[#DEC9C0]">Total Amount</span>
            <span className="font-bold text-[#8B0A1A] dark:text-[#F4D58D] tabular-nums">
              {totalDual.primary} ({totalDual.secondary})
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={sendWhatsAppReceipt}
            className="h-12 px-6 rounded-xl bg-[#8B0A1A] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm on WhatsApp</span>
          </button>
          <Link
            to="/track-order"
            className="h-12 px-6 rounded-xl border border-[#C9A24B] text-[#2B1B14] dark:text-[#F4D58D] text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export const TrackOrderPage: React.FC = () => {
  const { orders, currency } = useStore();
  const [queryId, setQueryId] = useState(orders[0]?.id || 'HAJ-2026-1042');
  const found = orders.find((o) => o.id.toLowerCase() === queryId.trim().toLowerCase());

  const steps = ['Confirmed', 'Preparing in Sialkot', 'Dispatched', 'Delivered'];
  const activeStep = found ? Math.max(0, steps.indexOf(found.status)) : -1;

  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B8862B] font-semibold">
            Nationwide Courier Tracking
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mt-2">
            Track Your Order
          </h1>
          <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0] mt-2">
            Enter your order number (try <span className="font-semibold">HAJ-2026-1042</span>) to check live
            preparation and dispatch status.
          </p>
        </div>

        <div className="flex gap-2 max-w-lg mx-auto mb-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#B8862B] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
              placeholder="HAJ-2026-1042"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-[#33131C] border border-[#C9A24B]/60 text-sm text-[#2B1B14] dark:text-[#FBF4E9]"
            />
          </div>
        </div>

        {found ? (
          <div className="rounded-2xl bg-white dark:bg-[#290E15] border border-[#C9A24B]/50 p-6 sm:p-8 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#EADFCB] dark:border-[#562630]">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#B8862B] font-semibold">
                  Order Reference
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                  #{found.id}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">Destination</p>
                <p className="font-semibold text-sm text-[#2B1B14] dark:text-[#FBF4E9]">
                  {found.city}, Pakistan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {steps.map((s, idx) => {
                const done = idx <= activeStep;
                return (
                  <div
                    key={s}
                    className={`p-3.5 rounded-xl border ${
                      done
                        ? 'border-[#C9A24B] bg-[#F6EBD9]/70 dark:bg-[#33131C]'
                        : 'border-[#EADFCB] dark:border-[#562630] opacity-55'
                    }`}
                  >
                    <Package
                      className={`w-5 h-5 mb-2 ${
                        done ? 'text-[#8B0A1A] dark:text-[#F4D58D]' : 'text-[#6B5B53]'
                      }`}
                    />
                    <p className="text-xs font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">{s}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-sm pt-4 border-t border-[#EADFCB] dark:border-[#562630]">
              <span className="text-[#6B5B53] dark:text-[#DEC9C0]">
                {found.items.length} item(s) · {found.paymentMethod}
              </span>
              <span className="font-bold text-[#8B0A1A] dark:text-[#F4D58D] tabular-nums">
                {formatDualPrice(found.totalPKR, currency).primary}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 rounded-2xl border border-[#EADFCB] dark:border-[#562630]">
            <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0]">
              No order found with that reference. Need assistance? Message us at {STORE_INFO.phoneDisplay}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AccountPage: React.FC = () => {
  const { orders, wishlist, currency } = useStore();
  return (
    <div className="bg-[#FFFBF5] dark:bg-[#1D090E] min-h-screen py-14 px-4">
      <div className="max-w-[1100px] mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADFCB] dark:border-[#562630]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold-gradient text-[#2B1B14] flex items-center justify-center">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                My Jewellery Account
              </h1>
              <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0]">
                Manage your orders, wishlist &amp; delivery preferences
              </p>
            </div>
          </div>
          <Link
            to="/wishlist"
            className="h-11 px-5 rounded-xl border border-[#C9A24B] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 text-[#2B1B14] dark:text-[#F4D58D]"
          >
            <Heart className="w-4 h-4 text-[#8B0A1A]" />
            <span>Wishlist ({wishlist.length})</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#F6EBD9]/50 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
            <MapPin className="w-5 h-5 text-[#B8862B] mb-3" />
            <h2 className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-1">
              Boutique Origin
            </h2>
            <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0]">
              Dispatched directly from {STORE_INFO.location}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F6EBD9]/50 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
            <Truck className="w-5 h-5 text-[#B8862B] mb-3" />
            <h2 className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-1">
              Saved Orders
            </h2>
            <p className="text-sm text-[#6B5B53] dark:text-[#DEC9C0]">
              {orders.length} order(s) recorded on this device
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F6EBD9]/50 dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630]">
            <MessageCircle className="w-5 h-5 text-[#B8862B] mb-3" />
            <h2 className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9] mb-1">
              VIP Concierge
            </h2>
            <a
              href={buildWhatsAppLink('Assalam-o-Alaikum! I need help with my Hassan Jewellery account.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#8B0A1A] dark:text-[#F4D58D] hover:underline"
            >
              Chat {STORE_INFO.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
            Recent Orders
          </h2>
          {orders.map((ord) => {
            const total = formatDualPrice(ord.totalPKR, currency);
            return (
              <div
                key={ord.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#290E15] border border-[#EADFCB] dark:border-[#562630] flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-[#2B1B14] dark:text-[#FBF4E9]">
                    Order #{ord.id}
                  </p>
                  <p className="text-xs text-[#6B5B53] dark:text-[#DEC9C0]">
                    {ord.city} · {ord.paymentMethod} · Status: {ord.status}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm tabular-nums text-[#8B0A1A] dark:text-[#F4D58D]">
                    {total.primary} ({total.secondary})
                  </span>
                  <Link
                    to="/track-order"
                    className="px-4 py-2 rounded-lg border border-[#C9A24B] text-xs font-semibold text-[#2B1B14] dark:text-[#F4D58D]"
                  >
                    Track
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
