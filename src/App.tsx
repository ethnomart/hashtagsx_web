import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { StoreProvider, useStore } from './context/StoreContext';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductPage } from './components/ProductPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ContactPage } from './components/ContactPage';
import { HomeReviews } from './components/Reviews';
import { BagDrawer } from './components/BagDrawer';
import { MenuDrawer } from './components/MenuDrawer';
import { WhyDrawer } from './components/WhyDrawer';
import { ShippingModal } from './components/ShippingModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export function AppContent() {
  const { activeProductModal, isPrivacyOpen, isContactOpen } = useStore();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-black dark:bg-dark-bg dark:text-cream transition-colors duration-300">
      <Preloader />
      <Header />
      <main className="flex-grow">
        {isContactOpen ? (
          <ContactPage />
        ) : isPrivacyOpen ? (
          <PrivacyPage />
        ) : activeProductModal ? (
          <ProductPage key={activeProductModal.id} />
        ) : (
          <>
            <Hero />
            <FilterBar />
            <ProductGrid />
            <HomeReviews />
          </>
        )}
      </main>
      <Footer />
      <BagDrawer />
      <MenuDrawer />
      <WhyDrawer />
      <ShippingModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
