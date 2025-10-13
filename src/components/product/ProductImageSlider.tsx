"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  images: string[];
  productName: string;
  colorName: string;
}

export default function ProductImageSlider({ images, productName, colorName }: Props) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet !bg-gray-400 opacity-60",
        bulletActiveClass: "!bg-primary opacity-100",
      }}
      loop
      className="h-full w-full"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <Image
            height={400}
            width={600}
            src={img}
            alt={`${productName}-${colorName}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
