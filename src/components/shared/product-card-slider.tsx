"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number; // optional for discount
  rating?: number; // e.g., 4.5
  soldCount?: number; // e.g., 120
}

interface ProductCardSliderProps {
  products: Product[];
}

export default function ProductCardSlider({
  products,
}: ProductCardSliderProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative w-full ">
      {/* --- Navigation Buttons --- */}
      <Button
        ref={prevRef}
        variant="ghost"
        size="icon"
        className="absolute rounded-full left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        ref={nextRef}
        variant="ghost"
        size="icon"
        className="absolute rounded-full  right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>

      {/* --- Swiper Slider --- */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={3}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onInit={(swiper) => {
          if (swiper.params.navigation) {
            const navigation = swiper.params.navigation as any;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => {
          const discount =
            product.originalPrice && product.originalPrice > product.price
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

          return (
            <SwiperSlide key={product.id} className="py-4">
              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white">
                {/* --- Product Image --- */}
                <div className="relative h-64 w-full overflow-hidden">
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      -{discount}%
                    </span>
                  )}

                  <Image
                    height={400}
                    width={600}
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* --- Product Info --- */}
                <div className="p-4">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Price + Discount */}
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-lg font-bold text-primary">
                      Tk {product.price}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        Tk {product.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Rating + Sold Count */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={clsx(
                            "fill-yellow-400",
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {product.rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                    {product.soldCount && (
                      <span className="text-xs text-gray-500">
                        {product.soldCount}+ sold
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
