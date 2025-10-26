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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<any[]>([]);

  // ✅ State to hold selected attributes for each product
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [productId: string]: any;
  }>({});

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/products/public/search/?${searchParams.toString()}&language=EN`
      );
      const data = res.data;
      setProductList(data.products);

      // ✅ Initialize selected attribute for each product
      const initSelections: any = {};
      data.products.forEach((p: any) => {
        if (p.attributes?.length > 0) {
          initSelections[p.id] = p.attributes[0];
        }
      });
      setSelectedAttributes(initSelections);
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
        <div className="md:w-64 md:flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* --- Product Grid --- */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">
            Showing {productList.length} results
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productList.map((product) => {
              const selectedAttribute = selectedAttributes[product.id];
              const discount =
                product.price && product.price > product.discount
                  ? Math.round(
                      ((product.price - product.discount) / product.price) * 100
                    )
                  : 0;

              return (
                <div
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="group rounded-2xl cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white"
                >
                  {/* --- Image Swiper --- */}
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
                      {selectedAttribute?.images?.map(
                        (img: string, i: number) => (
                          <SwiperSlide key={i}>
                            <Image
                              height={400}
                              width={600}
                              src={img}
                              alt={`${i}`}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </div>

                  {/* --- Product Info --- */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold line-clamp-1">
                      {product?.translations?.[0]?.name}
                    </h3>

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
                      <p className="text-sm">
                        stock ({selectedAttribute?.stock || 0})
                      </p>
                    </div>

                    {/* --- Color Dots --- */}
                    {product?.attributes?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {product.attributes.map(
                          (attribute: any, attrIndex: number) => {
                            const isSelected =
                              selectedAttribute?.id === attribute.id;
                            const gradient = attribute.colors?.length
                              ? `conic-gradient(${attribute.colors
                                  .map((c: any) => c.color.code)
                                  .join(",")})`
                              : "#e5e7eb";

                            return (
                              <button
                                key={attrIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAttributes((prev) => ({
                                    ...prev,
                                    [product.id]: attribute,
                                  }));
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
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {productList.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No products found for “{searchTerm}”
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
