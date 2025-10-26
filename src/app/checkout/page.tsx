"use client";

import { useCart } from "@/components/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import axios from "@/utils/axios"; // ✅ your Axios instance (configured with baseURL)
import { toast } from "sonner";

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
  });

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isLoading,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  // ✅ Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle place order
  const handlePlaceOrder = async () => {
    if (!cart.length) return toast.error("Your cart is empty.");

    try {
      setLoading(true);

      const orderData = {
        guestName: `${form.firstName} ${form.lastName}`.trim(),
        guestEmail: form.email,
        guestPhone: form.phone,
        guestDistrict: form.city,
        guestAddress: form.street,
        totalAmount: total + 80, // including shipping
        status: "PENDING",
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product?.price,
          colorId: item.colorId || null,
          sizeId: item.sizeId || null,
        })),
        payment: {
          method: selectedPayment,
          status: selectedPayment === "CASH_ON_DELIVERY" ? "PENDING" : "PAID",
          amount: total + 80,
        },
      };

      const res = await axios.post("/orders/public", orderData); // ✅ your backend endpoint

      if (res.data) {
        toast.success("Order placed successfully!");
        clearCart();
        setForm({
          firstName: "",
          lastName: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          email: "",
          phone: "",
        });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to place order. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE — Shipping + Payment */}
        <div className="md:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street Address"
                className="border rounded-lg p-2 w-full"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="border rounded-lg p-2 w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: "BANK_TRANSFER", label: "Bank Transfer" },
                { id: "PAYPAL", label: "PayPal" },
                { id: "CASH_ON_DELIVERY", label: "Cash on Delivery" },
                { id: "STRIPE", label: "STRIPE" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Cart Summary */}
        <div className="bg-white shadow rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex-1 h-[340px] overflow-y-auto space-y-4">
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

                  <div className="relative min-w-20 h-20 rounded-md overflow-hidden">
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
                    <p className="text-sm font-bold text-rose-600">
                      ৳{(item.product?.price || 0) * item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 border-t pt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>80 TK</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{total + 80} TK</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`mt-6 w-full ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-green-700"
            } text-white font-semibold py-3 rounded-lg transition`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
