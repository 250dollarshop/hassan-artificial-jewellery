import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { StoreProvider } from './context/StoreContext';
import { GlobalEffects } from './components/GlobalEffects';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewAndCompareModals } from './components/QuickViewAndCompareModals';
import { FloatingActions } from './components/FloatingActions';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import {
  CheckoutPage,
  OrderConfirmationPage,
  TrackOrderPage,
  AccountPage,
} from './pages/CheckoutAndOrderPages';
import {
  BridalPage,
  CollectionsPage,
  GiftGuidePage,
  LookbookPage,
  WishlistPage,
} from './pages/CollectionsAndBridalPages';
import { SizeGuidePage, CareGuidePage, CustomOrderPage } from './pages/GuidesAndToolsPages';
import {
  AboutPage,
  ContactPage,
  FAQPage,
  ShippingReturnsPage,
  ReviewsPage,
  NotFoundPage,
} from './pages/BrandAndSupportPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <HashRouter>
          <ScrollToTop />
          <GlobalEffects />
          <div className="min-h-screen flex flex-col bg-[#FFFBF5] dark:bg-[#1D090E] text-[#2B1B14] dark:text-[#FBF4E9] transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage presetMode="all" />} />
                <Route path="/category/:slug" element={<ShopPage presetMode="all" />} />
                <Route path="/new-arrivals" element={<ShopPage presetMode="new" />} />
                <Route path="/sale" element={<ShopPage presetMode="sale" />} />
                <Route path="/bridal" element={<BridalPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/gift-guide" element={<GiftGuidePage />} />
                <Route path="/lookbook" element={<LookbookPage />} />
                <Route path="/size-guide" element={<SizeGuidePage />} />
                <Route path="/care-guide" element={<CareGuidePage />} />
                <Route path="/blog" element={<CareGuidePage />} />
                <Route path="/custom-order" element={<CustomOrderPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
            <QuickViewAndCompareModals />
            <FloatingActions />
          </div>
        </HashRouter>
      </StoreProvider>
    </MotionConfig>
  );
}
