import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { CurrencyCode, formatDualPrice } from '../config/store';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  paymentMethod: string;
  currency: CurrencyCode;
  subtotalPKR: number;
  deliveryFeePKR: number;
  totalPKR: number;
  items: {
    productId: string;
    name: string;
    image: string;
    pricePKR: number;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
  }[];
  status: 'Confirmed' | 'Preparing in Sialkot' | 'Dispatched' | 'Delivered';
}

export interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

export interface FlyingItemState {
  id: string;
  image: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

interface StoreContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  toggleCurrency: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cart: CartItem[];
  cartCount: number;
  cartSubtotalPKR: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    color?: string,
    size?: string,
    sourceRect?: DOMRect | null
  ) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateCartQty: (productId: string, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  cartWiggleKey: number;
  wishlist: string[];
  toggleWishlist: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;
  compareList: string[];
  toggleCompare: (productId: string) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  recentlyViewed: string[];
  trackRecentlyViewed: (productId: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  orders: OrderRecord[];
  placeOrder: (order: Omit<OrderRecord, 'id' | 'createdAt' | 'status'>) => OrderRecord;
  toasts: ToastMessage[];
  showToast: (title: string, subtitle?: string, image?: string) => void;
  flyingItem: FlyingItemState | null;
  cartIconRef: React.RefObject<HTMLButtonElement | null>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const VALID_PRODUCT_IDS = new Set(PRODUCTS.map((p) => p.id));

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: 'HAJ-2026-1042',
    createdAt: '2026-11-24T14:20:00.000Z',
    customerName: 'Ayesha Siddiqui',
    phone: '+92 300 1234567',
    email: 'ayesha@example.com',
    city: 'Lahore',
    address: 'House 24-B, Street 9, DHA Phase 5, Lahore',
    paymentMethod: 'Cash on Delivery',
    currency: 'PKR',
    subtotalPKR: 1000,
    deliveryFeePKR: 250,
    totalPKR: 1250,
    items: [
      {
        productId: PRODUCTS[0].id,
        name: PRODUCTS[0].name,
        image: PRODUCTS[0].images[0],
        pricePKR: PRODUCTS[0].pricePKR,
        quantity: 1,
        selectedColor: PRODUCTS[0].colors[0] || 'Gold',
        selectedSize: PRODUCTS[0].sizes[0],
      },
    ],
    status: 'Dispatched',
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('haj_currency');
    return saved === 'USD' ? 'USD' : 'PKR';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('haj_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>('haj_cart', []).filter((i) => VALID_PRODUCT_IDS.has(i.productId))
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>('haj_wishlist', []).filter((id) => VALID_PRODUCT_IDS.has(id))
  );
  const [compareList, setCompareList] = useState<string[]>(() =>
    readStorage<string[]>('haj_compare', []).filter((id) => VALID_PRODUCT_IDS.has(id))
  );
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = readStorage<string[]>('haj_recent', []).filter((id) => VALID_PRODUCT_IDS.has(id));
    return saved.length > 0 ? saved : PRODUCTS.slice(0, 4).map((p) => p.id);
  });
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readStorage('haj_orders', SAMPLE_ORDERS)
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cartWiggleKey, setCartWiggleKey] = useState(0);
  const [flyingItem, setFlyingItem] = useState<FlyingItemState | null>(null);
  const cartIconRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    localStorage.setItem('haj_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('haj_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('haj_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('haj_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('haj_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('haj_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('haj_orders', JSON.stringify(orders));
  }, [orders]);

  const setCurrency = useCallback((c: CurrencyCode) => setCurrencyState(c), []);
  const toggleCurrency = useCallback(
    () => setCurrencyState((prev) => (prev === 'PKR' ? 'USD' : 'PKR')),
    []
  );
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  const showToast = useCallback((title: string, subtitle?: string, image?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-2), { id, title, subtitle, image }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback(
    (
      product: Product,
      quantity = 1,
      color?: string,
      size?: string,
      sourceRect?: DOMRect | null
    ) => {
      const selectedColor = color || product.colors[0] || product.color || 'Gold';
      const selectedSize = size || product.sizes[0] || 'Free Size (Adjustable)';

      setCart((prev) => {
        const idx = prev.findIndex(
          (item) =>
            item.productId === product.id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
        );
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
          return updated;
        }
        return [...prev, { productId: product.id, quantity, selectedColor, selectedSize }];
      });

      if (sourceRect && cartIconRef.current) {
        const dest = cartIconRef.current.getBoundingClientRect();
        const flyId = `${Date.now()}`;
        setFlyingItem({
          id: flyId,
          image: product.images[0],
          fromX: sourceRect.left + sourceRect.width / 2,
          fromY: sourceRect.top + sourceRect.height / 2,
          toX: dest.left + dest.width / 2,
          toY: dest.top + dest.height / 2,
        });
        window.setTimeout(() => {
          setFlyingItem((cur) => (cur?.id === flyId ? null : cur));
        }, 720);
      }

      setCartWiggleKey((k) => k + 1);
      const prices = formatDualPrice(product.pricePKR, currency);
      showToast(`Added ${product.name}`, `${prices.primary} · ${selectedColor}`, product.images[0]);
    },
    [currency, showToast]
  );

  const removeFromCart = useCallback((productId: string, color: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.selectedColor === color && i.selectedSize === size)
      )
    );
  }, []);

  const updateCartQty = useCallback(
    (productId: string, color: string, size: string, qty: number) => {
      if (qty <= 0) {
        removeFromCart(productId, color, size);
        return;
      }
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.selectedColor === color && i.selectedSize === size
            ? { ...i, quantity: qty }
            : i
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalPKR = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (product ? product.pricePKR * item.quantity : 0);
  }, 0);

  const toggleWishlist = useCallback(
    (productId: string, productName?: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        const next = exists ? prev.filter((id) => id !== productId) : [productId, ...prev];
        if (!exists && productName) {
          showToast('Saved to Wishlist', productName);
        }
        return next;
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const toggleCompare = useCallback(
    (productId: string) => {
      setCompareList((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);
        }
        if (prev.length >= 3) {
          showToast('Compare limit reached', 'Maximum 3 designs can be compared at once.');
          return prev;
        }
        showToast('Added to Compare', 'Open Compare drawer to view side-by-side specs.');
        return [...prev, productId];
      });
    },
    [showToast]
  );

  const trackRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  }, []);

  const placeOrder = useCallback(
    (orderData: Omit<OrderRecord, 'id' | 'createdAt' | 'status'>): OrderRecord => {
      const num = Math.floor(1050 + Math.random() * 8900);
      const newOrder: OrderRecord = {
        ...orderData,
        id: `HAJ-2026-${num}`,
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
      };
      setOrders((prev) => [newOrder, ...prev]);
      setCart([]);
      return newOrder;
    },
    []
  );

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        theme,
        toggleTheme,
        cart,
        cartCount,
        cartSubtotalPKR,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartWiggleKey,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        isCompareOpen,
        setIsCompareOpen,
        recentlyViewed,
        trackRecentlyViewed,
        quickViewProduct,
        setQuickViewProduct,
        orders,
        placeOrder,
        toasts,
        showToast,
        flyingItem,
        cartIconRef,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
