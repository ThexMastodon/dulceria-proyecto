"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isBox?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, isBox?: boolean) => void;
  updateQuantity: (id: number, newQuantity: number, isBox?: boolean) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('sugar-cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          const cleanedCart = parsedCart.map((item: CartItem) => ({
            ...item,
            name: item.name.replace(/\s*\(Caja x\d+\)/, ' - Caja')
          }));
          setItems(cleanedCart);
        } catch (e) {
          console.error("Error loading cart", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sugar-cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.isBox === newItem.isBox);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.isBox === newItem.isBox
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: number, isBox: boolean = false) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && (i.isBox ?? false) === isBox)));
  };

  const updateQuantity = (id: number, newQuantity: number, isBox: boolean = false) => {
    if (newQuantity <= 0) {
      removeItem(id, isBox);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && (i.isBox ?? false) === isBox
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};