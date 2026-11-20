"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { linePrice } from "@/lib/products";

const STORAGE_KEY = "scenttrail:cart";

const CartContext = createContext({
  items: [],
  count: 0,
  subtotal: 0,
  open: false,
  setOpen: () => {},
  addProduct: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clearCart: () => {},
  hydrated: false,
});

function itemKey(product, color, plan) {
  return `${product.id}::${color || "none"}::${plan || "once"}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(stored)) setItems(stored);
    } catch {
      setItems([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage failures
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const addProduct = useCallback((product, options = {}) => {
    if (!product) return;
    const quantity = Math.max(1, Number.parseInt(options.quantity, 10) || 1);
    const color = product.colors?.length ? options.color || product.colors[0].name : null;
    const plan = options.plan === "subscribe" && product.category === "refills" ? "subscribe" : "once";
    const key = itemKey(product, color, plan);
    const price = linePrice(product, plan);

    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item
        );
      }
      return [
        ...current,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          color,
          plan,
          price,
          quantity,
        },
      ];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const setQuantity = useCallback((key, quantity) => {
    const next = Math.max(1, Math.min(20, Number.parseInt(quantity, 10) || 1));
    setItems((current) => current.map((item) => (item.key === key ? { ...item, quantity: next } : item)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => Math.round(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100) / 100,
    [items]
  );
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, count, subtotal, open, setOpen, addProduct, removeItem, setQuantity, clearCart, hydrated }),
    [items, count, subtotal, open, addProduct, removeItem, setQuantity, clearCart, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
