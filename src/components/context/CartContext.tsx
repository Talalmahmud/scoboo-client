"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  productId: string;
  sizeId?: string;
  colorId?: string;
  quantity: number;
  product?: {
    name: string;
    image: string | null;
    price: number;
    discount?: number;
    color?: { id: string; code: string } | null;
    size?: { id: string; title: string } | null;
  };
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "product">) => void;
  removeFromCart: (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => void;
  increaseQuantity: (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => void;
  decreaseQuantity: (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => void;
  clearCart: () => void;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch product details for all items
  const fetchCartProducts = async (items: Omit<CartItem, "product">[]) => {
    if (items.length === 0) return [];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/public/carts` || "",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "API error");

      // Merge product data with local quantities
      return items.map((item) => {
        const product = data.data.find(
          (p: any) => p.productId === item.productId
        );
        return { ...item, product };
      });
    } catch (err) {
      console.error("❌ Failed to fetch cart items:", err);
      return items.map((item) => ({ ...item, product: null }));
    }
  };

  // ✅ Load from localStorage and sync with API
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (!stored) {
      setIsLoading(false);
      return;
    }

    const savedItems: Omit<CartItem, "product">[] = JSON.parse(stored);

    fetchCartProducts(savedItems)
      .then((cartWithProducts) => setCart(cartWithProducts))
      .finally(() => setIsLoading(false));
  }, []);

  // ✅ Save only IDs + quantity to localStorage
  useEffect(() => {
    if (!isLoading) {
      const minimalCart = cart.map(({ product, ...rest }) => rest);
      localStorage.setItem("cart", JSON.stringify(minimalCart));
    }
  }, [cart, isLoading]);

  // ✅ Add to cart and refresh from API
  const addToCart = async (newItem: Omit<CartItem, "product">) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) =>
          item.productId === newItem.productId &&
          item.sizeId === newItem.sizeId &&
          item.colorId === newItem.colorId
      );

      if (exists) {
        return prev.map((item) =>
          item === exists
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prev, { ...newItem }];
    });

    // Fetch updated products from backend
    const updatedLocalCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = await fetchCartProducts(updatedLocalCart);
    setCart(updatedCart);
  };

  // ✅ Remove
  const removeFromCart = (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => {
    const updated = cart.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.sizeId === sizeId &&
          item.colorId === colorId
        )
    );
    setCart(updated);
  };

  // ✅ Increase
  const increaseQuantity = (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.sizeId === sizeId &&
        item.colorId === colorId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ Decrease
  const decreaseQuantity = (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId &&
          item.sizeId === sizeId &&
          item.colorId === colorId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Clear
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
