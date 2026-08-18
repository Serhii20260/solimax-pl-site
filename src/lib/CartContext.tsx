// src/lib/CartContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number | null;
  priceDisplay: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'price' | 'quantity'> & { price?: unknown; quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function normalizeCartPrice(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const normalized = value
      .replace(/\s/g, '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function formatZlotyAmount(value: number): string {
  return `${Math.round(value).toLocaleString('pl-PL').replace(/\u00a0/g, ' ')},00 zl`;
}

function normalizeQuantity(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

function normalizeCartItem(item: Partial<Omit<CartItem, 'price'>> & { price?: unknown }): CartItem | null {
  if (!item || !item.id || !item.name) return null;

  return {
    id: String(item.id),
    name: String(item.name),
    price: normalizeCartPrice(item.price),
    priceDisplay: item.priceDisplay ? String(item.priceDisplay) : '',
    image: item.image ? String(item.image) : '',
    quantity: normalizeQuantity(item.quantity),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('solimax_cart') || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item) => normalizeCartItem(item))
        .filter((item): item is CartItem => Boolean(item));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('solimax_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'price' | 'quantity'> & { price?: unknown; quantity?: number }) => {
    const normalizedItem = normalizeCartItem(item);
    if (!normalizedItem) return;

    setCart(prev => {
      const existing = prev.find(i => i.id === normalizedItem.id);
      if (existing) {
        return prev.map(i => i.id === normalizedItem.id ? { ...i, quantity: i.quantity + normalizedItem.quantity } : i);
      }
      return [...prev, normalizedItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
