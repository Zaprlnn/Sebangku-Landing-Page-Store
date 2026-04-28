"use client";

import { useState, useEffect } from "react";

const CART_STORAGE_KEY = "sebangku-cart";
const CART_EVENT = "sebangku-cart-updated";

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCartFromStorage());

    const sync = () => setItems(readCartFromStorage());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) sync();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CART_EVENT, sync);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CART_EVENT, sync);
    };
  }, []);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new Event(CART_EVENT));
  };

  const addItem = (item: CartItem) => {
    const existing = items.find((i) => i.productId === item.productId);
    if (existing) {
      save(items.map((i) => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      save([...items, item]);
    }
  };

  const setItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      save(items.filter((i) => i.productId !== productId));
      return;
    }
    save(items.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const removeItem = (productId: string) => save(items.filter((i) => i.productId !== productId));
  const clearCart = () => save([]);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, setItemQuantity, removeItem, clearCart, total, itemCount };
}
