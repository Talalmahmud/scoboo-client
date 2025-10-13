"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

export default function Hero() {
  const slides = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1664202526535-c01e4b0c42b7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsb3RoaW5nJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
      title: "Discover Handcrafted Elegance",
      subtitle: "Explore বুনন রঙ’s exclusive handwoven collection",
      cta: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
      title: "Traditional. Timeless. Trendy.",
      subtitle: "বাংলার রঙ ও ঐতিহ্যের ছোঁয়ায় তৈরি পোশাক",
      cta: "Browse Collection",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&q=80",
      title: "Celebrate Culture Through Color",
      subtitle: "Every fabric tells a story of art and passion",
      cta: "Explore Now",
    },
  ];

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        pagination
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full max-h-[700px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transform transition-transform duration-700 hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-36 text-white max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg mb-6 text-gray-100">
                  {slide.subtitle}
                </p>
                <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded-full w-fit transition">
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
