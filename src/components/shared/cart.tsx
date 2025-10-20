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
import { ArrowLeft, ShoppingBasket, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isLoading,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <Sheet>
      {/* --- Cart Icon Trigger --- */}
      <SheetTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
          <ShoppingBasket className="h-6 w-6 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      {/* --- Cart Drawer --- */}
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b flex flex-row justify-between items-center">
            <SheetClose>
              <div className="flex items-center gap-1 text-gray-700 hover:text-rose-600 transition">
                <ArrowLeft />
                <span>Back to Shopping</span>
              </div>
            </SheetClose>
            <SheetTitle className="text-lg font-semibold">Your Cart</SheetTitle>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <p className="text-center text-gray-500 mt-10">Loading...</p>
            ) : cart.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.productId}-${item.sizeId}-${item.colorId}-${index}`}
                  className="flex items-center gap-3 border relative rounded-lg p-3 hover:shadow-sm transition"
                >
                  <button
                    onClick={() =>
                      removeFromCart(item.productId, item.sizeId, item.colorId)
                    }
                    className="absolute top-1 right-1 p-1 text-gray-500 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      src={
                        item.product?.image ||
                        "https://via.placeholder.com/100x100?text=No+Image"
                      }
                      alt={item.product?.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold line-clamp-1">
                      {item.product?.name || "Unnamed Product"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item.sizeId && <span>Size: {item.sizeId}</span>}{" "}
                      {item.colorId && <span>Color: {item.colorId}</span>}
                    </p>
                    <p className="text-xs text-gray-500">
                      ৳{item.product?.price} × {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-rose-600">
                      ৳{(item.product?.price || 0) * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.productId,
                          item.sizeId,
                          item.colorId
                        )
                      }
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.productId,
                          item.sizeId,
                          item.colorId
                        )
                      }
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
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
