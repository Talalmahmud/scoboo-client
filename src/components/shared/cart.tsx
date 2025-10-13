"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBasket, Trash, Trash2, X } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  // Example demo items
  const cartItems = [
    {
      id: 1,
      name: "Handwoven Cotton Saree",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",

      qty: 1,
    },
    {
      id: 2,
      name: "Traditional Silk Scarf",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      qty: 2,
    },
    {
      id: 3,
      name: "Traditional Silk Scarf",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      qty: 2,
    },
    {
      id: 4,
      name: "Traditional Silk Scarf",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      qty: 2,
    },
    {
      id: 5,
      name: "Traditional Silk Scarf",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      qty: 2,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Sheet>
      {/* --- Cart Icon Trigger --- */}
      <SheetTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
          <ShoppingBasket className="h-6 w-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        </button>
      </SheetTrigger>

      {/* --- Cart Drawer --- */}
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b flex flex-row justify-between px-4  w-full items-center">
            <SheetClose>
              <div className=" flex items-center gap-1">
                <ArrowLeft />
                Back to Shopping
              </div>
            </SheetClose>
            <SheetTitle className="text-lg font-semibold">Your Cart</SheetTitle>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border relative rounded-lg p-3 hover:shadow-sm transition"
                >
                  <div className=" absolute top-1 right-1">
                    <Trash2 />
                  </div>
                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.qty} × ৳{item.price}
                    </p>
                    <p className="text-sm font-bold text-rose-600">
                      ৳{item.price * item.qty}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="border-t p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm">Subtotal:</p>
              <p className="text-lg font-bold text-rose-600">৳{total}</p>
            </div>
            <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold">
              Checkout
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
