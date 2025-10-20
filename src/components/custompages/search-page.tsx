"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import FilterSidebar from "@/components/shared/filter-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
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

// Example product data (with color variants)
const dummyProducts = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    price: 950,
    originalPrice: 1200,
    rating: 4.2,
    soldCount: 89,
    colors: [
      {
        colorName: "White",
        colorCode: "#ffffff",
        images: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=60",
        ],
      },
      {
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop&q=60",
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Summer Floral Dress",
    price: 2250,
    rating: 4.8,
    soldCount: 132,
    colors: [
      {
        colorName: "Floral",
        colorCode: "#FFB6C1",
        images: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Denim Jeans",
    price: 1800,
    rating: 4.4,
    colors: [
      {
        colorName: "Blue",
        colorCode: "#1E3A8A",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Leather Handbag",
    price: 3450,
    rating: 4.9,
    colors: [
      {
        colorName: "Brown",
        colorCode: "#8B4513",
        images: [
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=60",
        ],
      },
    ],
  },
];

export default function SearchPage() {
  const searchParmas = useSearchParams();
  console.log(searchParmas.toString());
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);

  const filteredProducts = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const fetchProducts = async () => {
    try {
      const fetchData = await api.get(
        `/products/public/search/?${searchParmas.toString()}&language=EN`
      );
      const fetchReesult = await fetchData.data;
      setProductList(fetchReesult.products);
      console.log(fetchReesult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Search Bar --- */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button variant="default">
            <Search className="w-4 h-4 mr-1" /> Search
          </Button>
        </div>
      </div>

      {/* --- Page Layout --- */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto px-4 lg:px-0 py-4">
        {/* Sidebar Filters */}
        <div className="md:w-64 md:flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">
            Showing {filteredProducts.length} results
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
            {productList.map((product) => {
              const [selectedAttribute, setSelectedAttribute] =
                useState<ProductAttribute>(product.attributes[0]);
              const router = useRouter();
              const discount =
                product.price && product.price > product.discount
                  ? Math.round(
                      ((product.price - product.discount) / product.price) * 100
                    )
                  : 0;

              return (
                <SwiperSlide key={product.id} className="py-4">
                  <div
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="group rounded-2xl cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white"
                  >
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
                                  onClick={(e) => {
                                    e.stopPropagation(); // 👈 Prevents parent click
                                    setSelectedAttribute(attribute);
                                  }}
                                  className={clsx(
                                    "relative w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                                    isSelected
                                      ? "border-primary ring-2 ring-primary/30 scale-110"
                                      : "border-gray-300 hover:border-gray-400 hover:scale-105"
                                  )}
                                  style={{ background: gradient }}
                                >
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
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No products found for “{searchTerm}”
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
