"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

type ColorTranslation = { name: string };

type Color = {
  id: string;
  code: string;
  translations: ColorTranslation[];
};

type ProductAttributeColor = {
  color: Color;
};

type ProductAttribute = {
  id: string;
  stock: number | 0;
  images: string[];
  colors: ProductAttributeColor[];
};

type Product = {
  id: string;
  translations: any;
  price: number;
  discount: number;
  rating?: number;
  soldCount?: number;
  attributes: ProductAttribute[];
};

type ColorVariant = {
  colorName: string;
  colorCode: string;
  images: string[];
};

interface ProductCardSliderProps {
  products: Product[];
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
    <div className="relative w-full">
      {/* --- Outer Navigation Buttons --- */}
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

      {/* --- Outer Swiper (Products) --- */}
      <Swiper
        modules={[Navigation]}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation
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
        {products.map((product) => {
          const [selectedAttribute, setSelectedAttribute] =
            useState<ProductAttribute>(product.attributes[0]);
          const discount =
            product.price && product.price > product.discount
              ? Math.round(
                  ((product.price - product.discount) / product.price) * 100
                )
              : 0;

          return (
            <SwiperSlide key={product.id} className="py-4">
              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white">
                {/* --- Inner Image Slider with Pagination --- */}
                <div className="relative h-64 w-full overflow-hidden">
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      -{discount}%
                    </span>
                  )}

                  <Swiper
                    modules={[Pagination]}
                    pagination={{
                      clickable: true,
                      bulletClass:
                        "swiper-pagination-bullet !bg-gray-400 opacity-60",
                      bulletActiveClass: "!bg-primary opacity-100",
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop
                    className="h-full w-full"
                  >
                    {selectedAttribute?.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          height={400}
                          width={600}
                          src={img}
                          alt={`${i}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* --- Product Info --- */}
                <div className="p-4">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {product?.translations?.[0].name}
                  </h3>

                  {/* Price + Discount */}
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-lg font-bold text-primary">
                      Tk {product.price - product.discount}
                    </p>
                    {product.discount > 0 && (
                      <p className="text-sm text-gray-400 line-through">
                        Tk {product.price}
                      </p>
                    )}
                  </div>

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
                    {/* {product.soldCount && (
                      <span className="text-xs text-gray-500">
                        {product.soldCount}+ sold
                      </span>
                    )} */}
                    <p className=" text-sm">
                      stock ({selectedAttribute?.stock || 0})
                    </p>
                  </div>

                  {/* Color Dots */}
                  {/* {product.colors.length > 1 && (
                    <div className="flex items-center gap-2 mt-3">
                      {product.colors.map((c) => (
                        <button
                          key={c.colorName}
                          onClick={() => setSelectedColor(c)}
                          className={clsx(
                            "w-5 h-5 rounded-full border shadow-sm ring-offset-2 transition-all",
                            selectedColor.colorCode === c.colorCode
                              ? "ring-2 ring-primary scale-110"
                              : "hover:ring-2 hover:ring-gray-300"
                          )}
                          style={{ backgroundColor: c.colorCode }}
                          title={c.colorName}
                        />
                      ))}
                    </div>
                  )} */}

                  {product?.attributes?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-3">
                        {product.attributes.map((attribute, attrIndex) => {
                          const isSelected =
                            selectedAttribute?.id === attribute.id;
                          const gradient = attribute.colors.length
                            ? `conic-gradient(${attribute.colors
                                .map((c) => c.color.code)
                                .join(",")})`
                            : "#e5e7eb"; // fallback gray if no color

                          return (
                            <button
                              key={attrIndex}
                              onClick={() => setSelectedAttribute(attribute)}
                              className={clsx(
                                "relative w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                                isSelected
                                  ? "border-primary ring-2 ring-primary/30 scale-110"
                                  : "border-gray-300 hover:border-gray-400 hover:scale-105"
                              )}
                              style={{ background: gradient }}
                            >
                              {/* Inner white dot for contrast */}
                              <div
                                className={clsx(
                                  "absolute inset-0 rounded-full",
                                  isSelected ? "ring-2 ring-white/70" : ""
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
