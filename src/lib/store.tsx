'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product } from '@/data/products';
import { config } from '@/data/config';

// Types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

export interface User {
  name: string;
  isMember: boolean;
  membershipExpiry: string | null;
}

interface StoreState {
  cart: CartItem[];
  user: User;
  isHydrated: boolean;
}

interface StoreActions {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  activateMembership: () => void;
  updateUserName: (name: string) => void;
  resetStore: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isMembershipActive: () => boolean;
  getDaysRemaining: () => number;
}

type Store = StoreState & StoreActions;

const defaultUser: User = {
  name: 'Customer',
  isMember: false,
  membershipExpiry: null,
};

const StoreContext = createContext<Store | null>(null);

const STORAGE_KEY = 'grocery-app-store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User>(defaultUser);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cart) setCart(parsed.cart);
        if (parsed.user) setUser(parsed.user);
      }
    } catch (error) {
      console.error('Failed to load store:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, user }));
      } catch (error) {
        console.error('Failed to save store:', error);
      }
    }
  }, [cart, user, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        emoji: product.emoji,
      }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, delta: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === productId);
      if (!item) return prev;

      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prev.filter(i => i.id !== productId);
      }
      return prev.map(i =>
        i.id === productId ? { ...i, qty: newQty } : i
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const activateMembership = useCallback(() => {
    const now = new Date();
    let newExpiry: Date;

    if (user.isMember && user.membershipExpiry) {
      const currentExpiry = new Date(user.membershipExpiry);
      if (currentExpiry > now) {
        newExpiry = new Date(currentExpiry);
      } else {
        newExpiry = now;
      }
    } else {
      newExpiry = now;
    }

    newExpiry.setDate(newExpiry.getDate() + config.membershipDuration);

    setUser(prev => ({
      ...prev,
      isMember: true,
      membershipExpiry: newExpiry.toISOString(),
    }));
  }, [user]);

  const updateUserName = useCallback((name: string) => {
    setUser(prev => ({ ...prev, name }));
  }, []);

  const resetStore = useCallback(() => {
    setCart([]);
    setUser(defaultUser);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const isMembershipActive = useCallback(() => {
    if (!user.isMember || !user.membershipExpiry) return false;
    return new Date(user.membershipExpiry) > new Date();
  }, [user]);

  const getDaysRemaining = useCallback(() => {
    if (!user.membershipExpiry) return 0;
    const expiry = new Date(user.membershipExpiry);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [user]);

  const store: Store = {
    cart,
    user,
    isHydrated,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    activateMembership,
    updateUserName,
    resetStore,
    getCartTotal,
    getCartCount,
    isMembershipActive,
    getDaysRemaining,
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
