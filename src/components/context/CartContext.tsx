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

  // --- Utility: Save minimal cart to localStorage ---
  const saveCartToStorage = (cartItems: CartItem[]) => {
    const minimalCart = cartItems.map(({ product, ...rest }) => rest);
    localStorage.setItem("cart", JSON.stringify(minimalCart));
  };

  // --- Utility: Merge API product data with local cart ---
  const mergeProducts = (
    localItems: Omit<CartItem, "product">[],
    apiItems: any[]
  ) => {
    return localItems.map((item) => {
      const product =
        apiItems?.find((p) => p.productId === item.productId) || null;
      return { ...item, product };
    });
  };

  // --- Fetch product details for cart items ---
  const fetchCartProducts = async (items: Omit<CartItem, "product">[]) => {
    if (!items.length) return [];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/public/carts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "API error");
      return mergeProducts(items, data.data);
    } catch (err) {
      console.error("❌ Failed to fetch cart products:", err);
      return mergeProducts(items, []);
    }
  };

  // --- Load cart from localStorage on mount ---
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

  // --- Sync cart with localStorage whenever it changes ---
  useEffect(() => {
    if (!isLoading) saveCartToStorage(cart);
  }, [cart, isLoading]);

  // --- Add item to cart ---
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
          item.productId === newItem.productId &&
          item.sizeId === newItem.sizeId &&
          item.colorId === newItem.colorId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prev, { ...newItem }];
    });

    // Optionally fetch product details for the new item only
    const updatedCart = await fetchCartProducts([
      ...cart.map(({ product, ...rest }) => rest),
      newItem,
    ]);
    setCart(updatedCart);
  };

  // --- Remove item from cart ---
  const removeFromCart = (
    productId: string,
    sizeId?: string,
    colorId?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.sizeId === sizeId &&
            item.colorId === colorId
          )
      )
    );
  };

  // --- Increase quantity ---
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

  // --- Decrease quantity ---
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

  // --- Clear cart ---
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

// --- Hook to use cart context ---
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
