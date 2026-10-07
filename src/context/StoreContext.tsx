import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, FilterCategory, ViewMode } from '../types';
import { products } from '../data/products';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string, size: string, color?: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  totalCartCount: number;
  cartSubtotal: number;
  
  checkoutIntent: boolean;
  setCheckoutIntent: (v: boolean) => void;
  buyNow: (product: Product, size: string, quantity?: number, color?: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isWhyOpen: boolean;
  setIsWhyOpen: (open: boolean) => void;
  isShippingOpen: boolean;
  setIsShippingOpen: (open: boolean) => void;
  
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;
  goShop: () => void;
  isPrivacyOpen: boolean;
  openPrivacy: () => void;
  isContactOpen: boolean;
  openContact: () => void;
  
  filterCategory: FilterCategory;
  setFilterCategory: (cat: FilterCategory) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (complete: boolean) => void;
  replayPreloader: () => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hashtagsx_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const productFromPath = (): Product | null => {
    const m = window.location.pathname.match(/^\/product\/([\w-]+)\/?$/);
    return m ? products.find((p) => p.slug === m[1]) || null : null;
  };
  const [activeProductModal, setActiveProduct] = useState<Product | null>(() => {
    try {
      return productFromPath();
    } catch {
      return null;
    }
  });

  const privacyFromPath = (): boolean => /^\/privacy-policy\/?$/.test(window.location.pathname);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(() => {
    try {
      return privacyFromPath();
    } catch {
      return false;
    }
  });

  const contactFromPath = (): boolean => /^\/contact\/?$/.test(window.location.pathname);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(() => {
    try {
      return contactFromPath();
    } catch {
      return false;
    }
  });

  // Opening a product moves to its own address (/product/slug); closing returns to the shop
  const setActiveProductModal = (product: Product | null) => {
    setActiveProduct(product);
    setIsPrivacyOpen(false);
    setIsContactOpen(false);
    try {
      const target = product ? '/product/' + product.slug : '/';
      if (window.location.pathname !== target) window.history.pushState({}, '', target);
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    } catch {}
  };

  useEffect(() => {
    const onPop = () => {
      setActiveProduct(productFromPath());
      setIsPrivacyOpen(privacyFromPath());
      setIsContactOpen(contactFromPath());
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const openContact = () => {
    setActiveProduct(null);
    setIsPrivacyOpen(false);
    setIsContactOpen(true);
    try {
      if (window.location.pathname !== '/contact') window.history.pushState({}, '', '/contact');
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    } catch {}
  };

  const openPrivacy = () => {
    setActiveProduct(null);
    setIsContactOpen(false);
    setIsPrivacyOpen(true);
    try {
      if (window.location.pathname !== '/privacy-policy') window.history.pushState({}, '', '/privacy-policy');
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    } catch {}
  };

  const goShop = () => {
    setActiveProductModal(null);
    setTimeout(() => document.getElementById('product-catalog')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const [filterCategory, setFilterCategory] = useState<FilterCategory>('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid-3');
  const [searchQuery, setSearchQuery] = useState('');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('hashtagsx_theme_v2') as 'light' | 'dark') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('hashtagsx_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('hashtagsx_theme_v2', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  }, [theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [checkoutIntent, setCheckoutIntent] = useState(false);

  const addToCart = (product: Product, size: string, quantity = 1, color?: string) => {
    sound.playSuccess();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, color, quantity }];
    });

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#eb3324', '#000000', '#ffffff']
      });
    } catch {}

    showToast('Added ' + product.title + ' (' + (color ? color + ', ' : '') + size + ') to bag');
  };

  const removeFromCart = (productId: string, size: string, color?: string) => {
    sound.playClick();
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size && item.color === color)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number, color?: string) => {
    sound.playClick();
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const toggleTheme = () => {
    sound.playClick();
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playPop();
  };

  const replayPreloader = () => {
    setIsPreloaderComplete(false);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const buyNow = (product: Product, size: string, quantity = 1, color?: string) => {
    addToCart(product, size, quantity, color);
    setCheckoutIntent(true);
    setIsCartOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartCount,
        cartSubtotal,
        checkoutIntent,
        setCheckoutIntent,
        buyNow,
        isCartOpen,
        setIsCartOpen,
        isMenuOpen,
        setIsMenuOpen,
        isWhyOpen,
        setIsWhyOpen,
        isShippingOpen,
        setIsShippingOpen,
        activeProductModal,
        setActiveProductModal,
        goShop,
        isPrivacyOpen,
        openPrivacy,
        isContactOpen,
        openContact,
        filterCategory,
        setFilterCategory,
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery,
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        isPreloaderComplete,
        setIsPreloaderComplete,
        replayPreloader,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
