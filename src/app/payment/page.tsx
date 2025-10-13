"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ChevronRight,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Lock,
  Star,
  Clock,
  Package,
  Heart,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";

const steps = ["Cart", "Shipping", "Payment", "Review"];

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      setIsAnimating(false);
    }, 300);
  };

  const prevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="w-full max-w-6xl text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-4">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="text-[12px] font-semibold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            PREMIUM SHOPPING EXPERIENCE
          </span>
          <Crown className="w-5 h-5 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3 ">
          Secure Checkout
        </h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Complete your purchase with confidence - your satisfaction is
          guaranteed
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-8 relative z-10">
        {/* Progress & Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Enhanced Step Indicator */}
          <Card className="w-full shadow-2xl border-0 rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between relative">
                {/* Animated Progress Bar */}
                <div className="absolute top-4 left-0 right-0 h-2 bg-gray-200 rounded-full -z-10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-500/25"
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex flex-col items-center relative"
                  >
                    <button
                      onClick={() => !isAnimating && setCurrentStep(index)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 transform hover:scale-110 ${
                        index <= currentStep
                          ? "border-white bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                          : "border-gray-300 bg-white text-gray-500 shadow-md"
                      } ${
                        index === currentStep
                          ? "ring-4 ring-blue-500/20 scale-110"
                          : ""
                      }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </button>
                    <span
                      className={`text-sm font-semibold mt-3 transition-all duration-300 ${
                        index <= currentStep
                          ? "text-gray-900 scale-105"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                    {index === currentStep && (
                      <div className="absolute -bottom-2 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content with Animation */}
          <Card
            className={`w-full shadow-2xl border-0 rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-500 transform ${
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-blue-50/30">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl bg-gradient-to-br ${
                    currentStep === 0
                      ? "from-blue-500 to-purple-600"
                      : currentStep === 1
                      ? "from-green-500 to-emerald-600"
                      : currentStep === 2
                      ? "from-orange-500 to-red-600"
                      : "from-purple-500 to-pink-600"
                  }`}
                >
                  {currentStep === 0 && "🛒"}
                  {currentStep === 1 && "🚚"}
                  {currentStep === 2 && "💳"}
                  {currentStep === 3 && "📋"}
                </div>
                <div>
                  <div className="text-gray-900">{steps[currentStep]}</div>
                  <div className="text-sm font-normal text-gray-600 mt-1">
                    {currentStep === 0 && "Review your items and quantities"}
                    {currentStep === 1 && "Enter your delivery information"}
                    {currentStep === 2 && "Choose your payment method"}
                    {currentStep === 3 && "Confirm your order details"}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {currentStep === 0 && <CartStep />}
              {currentStep === 1 && <ShippingStep />}
              {currentStep === 2 && <PaymentStep />}
              {currentStep === 3 && <ReviewStep />}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isAnimating}
              className="flex items-center gap-3 px-8 py-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span className="font-semibold">Back</span>
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                disabled={isAnimating}
                className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold group"
              >
                <span>Continue to {steps[currentStep + 1]}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                disabled={isAnimating}
                className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold group"
              >
                <Shield className="w-4 h-4" />
                <span>Confirm & Pay Now</span>
                <Zap className="w-4 h-4 transition-transform group-hover:scale-110" />
              </Button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <OrderSummary currentStep={currentStep} />
        </div>
      </div>

      {/* Enhanced Trust Badges */}
      <div className="w-full max-w-6xl mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "256-bit SSL Secure",
              desc: "Bank-level encryption",
            },
            { icon: Clock, title: "24/7 Support", desc: "Always here to help" },
            { icon: Package, title: "Free Returns", desc: "30-day guarantee" },
            { icon: Star, title: "5-Star Rated", desc: "By 10k+ customers" },
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Enhanced Step 1: Cart --- */
function CartStep() {
  const cartItems = [
    {
      id: 1,
      name: "Organic Cotton T-Shirt",
      qty: 2,
      price: 950,
      color: "White",
      size: "M",
      image: "👕",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      qty: 1,
      price: 1800,
      color: "Blue",
      size: "32",
      image: "👖",
      rating: 4.6,
      reviews: 89,
    },
  ];

  const [quantities, setQuantities] = useState(
    cartItems.map((item) => item.qty)
  );

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = newQty;
      setQuantities(newQuantities);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item, index) => sum + quantities[index] * item.price,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 120;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">{item.image}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {item.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({item.reviews})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-gray-200 border"></div>
                  {item.color}
                </span>
                <span>Size: {item.size}</span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(index, quantities[index] - 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantities[index]}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, quantities[index] + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-sm transition-colors"
                  >
                    +
                  </button>
                </div>

                <button className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-900 text-lg">
                ৳ {quantities[index] * item.price}
              </p>
              <p className="text-sm text-gray-500">৳ {item.price} each</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-100">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">৳ {subtotal}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span
              className={`font-semibold ${
                shipping === 0 ? "text-green-600" : ""
              }`}
            >
              {shipping === 0 ? "FREE" : `৳ ${shipping}`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax (5%)</span>
            <span className="font-semibold">৳ {tax}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ৳ {total}
            </span>
          </div>

          {subtotal < 2000 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                <strong>Add ৳ {2000 - subtotal} more</strong> for free shipping!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- Enhanced Step 2: Shipping --- */
function ShippingStep() {
  const [selectedShipping, setSelectedShipping] = useState("standard");

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 120,
      time: "3-5 days",
      icon: Truck,
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 250,
      time: "1-2 days",
      icon: Zap,
    },
    {
      id: "same-day",
      name: "Same Day Delivery",
      price: 500,
      time: "Today",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Shipping Address */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-100">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Shipping Address
            </h3>
            <p className="text-gray-600 text-sm">
              Where should we deliver your order?
            </p>
          </div>
        </div>

        <form className="grid gap-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                First Name
              </label>
              <Input
                placeholder="John"
                required
                className="rounded-xl border-gray-300 focus:border-blue-500 h-12 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <Input
                placeholder="Doe"
                required
                className="rounded-xl border-gray-300 focus:border-blue-500 h-12 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <Input
              placeholder="+880 1XXX-XXXXXX"
              required
              className="rounded-xl border-gray-300 focus:border-blue-500 h-12 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Address
            </label>
            <Input
              placeholder="123 Main Street, Banani"
              required
              className="rounded-xl border-gray-300 focus:border-blue-500 h-12 transition-all duration-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                City
              </label>
              <Input
                placeholder="Dhaka"
                required
                className="rounded-xl border-gray-300 focus:border-blue-500 h-12 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Postal Code
              </label>
              <Input
                placeholder="1213"
                required
                className="rounded-xl border-gray-300 focus:border-blue-500 h-12 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="save-address"
              className="rounded-lg border-gray-300 w-5 h-5 accent-blue-600"
            />
            <label
              htmlFor="save-address"
              className="text-sm text-gray-700 font-medium"
            >
              Save this address for future orders
            </label>
          </div>
        </form>
      </div>

      {/* Shipping Method */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-green-100">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Shipping Method
            </h3>
            <p className="text-gray-600 text-sm">
              Choose how you want to receive your order
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedShipping === option.id
                  ? "border-blue-500 bg-blue-50/50 shadow-md"
                  : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={(e) => setSelectedShipping(e.target.value)}
                className="w-5 h-5 accent-blue-600"
              />
              <div className="p-3 rounded-xl bg-white border">
                <option.icon className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">
                    {option.name}
                  </span>
                  <span className="font-bold text-gray-900">
                    ৳ {option.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{option.time}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Enhanced Step 3: Payment --- */
function PaymentStep() {
  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentMethods = [
    {
      id: "card",
      name: "Credit / Debit Card",
      icon: "💳",
      description: "Secure payment with your bank card",
      badges: ["Visa", "MasterCard", "Amex"],
    },
    {
      id: "bkash",
      name: "bKash",
      icon: "📱",
      description: "Fast and secure mobile payment",
      badges: ["Popular"],
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: "💰",
      description: "Pay when you receive your order",
      badges: ["No Fee"],
    },
  ];

  return (
    <div className=" space-y-8 text-justify">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-purple-100">
          <CreditCard className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Method
          </h3>
          <p className="text-gray-600 text-sm">Choose how you want to pay</p>
        </div>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex flex-col md:flex-row items-start gap-4 p-2 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedMethod === method.id
                ? "border-purple-500 bg-purple-50/30 shadow-md"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className=" flex items-center">
              {" "}
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="mt-1 w-5 h-5 accent-purple-600"
              />
              <div className="text-2xl">{method.icon}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-gray-900">
                  {method.name}
                </span>
                <div className="flex gap-1">
                  {method.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Card Details Form */}
      {selectedMethod === "card" && (
        <div className="mt-6 p-6 border border-gray-200 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50/30 space-y-5">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            Card Details
          </h4>
          <div className="space-y-4">
            <Input placeholder="Card Number" className="rounded-xl h-12" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVV" />
            </div>
            <Input placeholder="Cardholder Name" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-500" />
            Your payment details are secure and encrypted
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Enhanced Step 4: Review --- */
function ReviewStep() {
  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="font-bold text-2xl text-gray-900 mb-2">
          Ready to Complete!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Everything looks perfect! Review your order details one last time
          before confirming.
        </p>
      </div>

      {/* Order Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Info */}
        <Card className="border border-gray-200 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-blue-50/50">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-gray-600">123 Main Street, Banani</p>
              <p className="text-gray-600">Dhaka 1213, Bangladesh</p>
              <p className="text-gray-600">+880 1XXX-XXXXXX</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 rounded-lg">
              Change Address
            </Button>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card className="border border-gray-200 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-purple-50/50">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-gray-900">bKash</p>
              <p className="text-gray-600">
                Payment will be processed securely
              </p>
              <p className="text-gray-600">You'll be redirected to bKash</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 rounded-lg">
              Change Payment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Assurance */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-semibold text-emerald-900 mb-2">
              Your Order is Protected
            </h4>
            <p className="text-emerald-800 text-sm">
              We use bank-level SSL encryption to protect your personal
              information. Your data is never shared with third parties, and
              you're covered by our 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200">
        <p className="text-gray-600 text-sm mb-4">
          By clicking "Confirm & Pay Now", you agree to our Terms of Service and
          Privacy Policy.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          <span>256-bit SSL Secured Connection</span>
        </div>
      </div>
    </div>
  );
}

/* --- Enhanced Order Summary Component --- */
function OrderSummary({ currentStep }: { currentStep: number }) {
  const cartItems = [
    { id: 1, name: "Organic Cotton T-Shirt", qty: 2, price: 950 },
    { id: 2, name: "Slim Fit Denim Jeans", qty: 1, price: 1800 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 120;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-8 space-y-6">
      <Card className="shadow-2xl border-0 rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Progress Indicator */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Order Progress
              </span>
              <span className="text-sm font-bold text-blue-600">
                {currentStep + 1}/4
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg">👕</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-semibold">৳ {item.qty * item.price}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">৳ {subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span
                className={`font-medium ${
                  shipping === 0 ? "text-green-600" : ""
                }`}
              >
                {shipping === 0 ? "FREE" : `৳ ${shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">৳ {tax}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ৳ {total}
              </span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="mt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Discount code"
                className="flex-1 rounded-xl border-gray-300 text-sm h-10"
              />
              <Button
                variant="outline"
                className="rounded-xl text-sm h-10 font-semibold"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-sm text-emerald-800">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Secure checkout guaranteed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card className="shadow-lg border-0 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/30">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Our support team is here to help you
            </p>
            <Button variant="outline" size="sm" className="rounded-lg w-full">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
