"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";


interface ColorVariant {
  colorName: string;
  colorCode: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  soldCount?: number;
  colors: ColorVariant[];
}

interface ProductCardSliderProps {
  products: Product[];
}

export default function ProductCardSlider({ products }: ProductCardSliderProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
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
        className="absolute rounded-full right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={3}
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
          480: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="py-4">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
