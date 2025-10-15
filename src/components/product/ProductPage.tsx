"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import clsx from "clsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/utils/axios";

const productData = {
  id: "1",
  name: "Handcrafted Cotton Saree",
  price: 1890,
  originalPrice: 2490,
  rating: 4.6,
  soldCount: 85,
  description:
    "Experience the elegance of traditional weaving with our Handcrafted Cotton Saree. Made with premium cotton and vibrant dyes, this saree offers comfort and grace for all occasions.Experience the elegance of traditional weaving with our Handcrafted Cotton Saree. Made with premium cotton and vibrant dyes, this saree offers comfort and grace for all occasions.Experience the elegance of traditional weaving with our Handcrafted Cotton Saree. Made with premium cotton and vibrant dyes, this saree offers comfort and grace for all occasions.Experience the elegance of traditional weaving with our Handcrafted Cotton Saree. Made with premium cotton and vibrant dyes, this saree offers comfort and grace for all occasions.",

  specifications: {
    Material: "100% Cotton",
    Length: "6 meters",
    Weight: "1.2 kg",
    Colors: ["Red", "Green"],
    Sizes: ["S", "M", "L", "XL"],
  },
  colors: [
    {
      colorName: "Red",
      colorCode: ["#D72638", "#217A2D", "#FFCE00"], // multiple colors
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      colorName: "Green",
      colorCode: ["#217A2D", "#FFCE00", "#FACE00", "#EECE00"],
      images: [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      ],
      sizes: ["M", "L"],
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Ayesha Rahman",
      rating: 5,
      comment:
        "Absolutely loved the quality! The color is vibrant, and fabric is soft. Perfect for festive occasions!",
      date: "2025-09-22",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      rating: 4,
      comment:
        "Beautiful saree, though the color was slightly lighter than in the photo. Still worth the price!",
      date: "2025-09-28",
    },
  ],
};

type ColorTranslation = { name: string };

type Color = {
  id: string;
  code: string;
  translations: ColorTranslation[];
};

type ProductAttributeColor = {
  color: Color;
  id: string;
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
type Props = {
  product: Product;
};

export default function ProductDetailsPage({ product }: Props) {
  // console.log(product);
  const [selectedAttribute, setSelectedAttribute] = useState(
    product?.attributes[0]
  );
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedImage, setSelectedImage] = useState(
    selectedAttribute?.images[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState("description");

  //   const [product, setProduct] = useState<any>();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
      {/* ---- Top Section ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative group overflow-hidden rounded-xl border bg-gray-50 h-[500px] flex items-center justify-center">
            <Image
              src={selectedImage}
              alt={product.translations[0].name}
              width={800}
              height={800}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="flex gap-3">
            {selectedAttribute?.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={clsx(
                  "relative border rounded-md overflow-hidden w-20 h-20 transition-all",
                  selectedImage === img
                    ? "ring-2 ring-primary scale-105"
                    : "hover:ring-2 hover:ring-gray-300"
                )}
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {product?.translations?.[0].name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-semibold text-primary">
              Tk {product.price - product.discount}
            </p>
            {product?.price && (
              <p className="text-gray-400 line-through">Tk {product?.price}</p>
            )}
            {productData.originalPrice > productData.price && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                -
                {Math.round(
                  ((product.price - product.discount) / product.price) * 100
                )}
                %
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={clsx(
                  i < Math.floor(productData.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              {productData.rating.toFixed(1)} ({productData.soldCount}+ sold)
            </span>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Select Color:</p>
            <div className="flex gap-2">
              {product?.attributes?.map((colorVariant, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedAttribute(colorVariant);
                    setSelectedImage(colorVariant.images[0]);
                  }}
                  className={clsx(
                    "w-8 h-8 rounded-full border-2 p-1  transition-all",
                    selectedAttribute?.id === colorVariant.id
                      ? " border-primary ring-2 ring-primary/30 scale-110"
                      : "border-gray-300 hover:border-gray-400 hover:scale-105"
                  )}
                  title={colorVariant?.id}
                  style={{
                    background: `conic-gradient(${colorVariant?.colors
                      ?.map((item) => item.color.code)
                      .join(",")})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Select Size:</p>
            <div className="flex gap-3">
              {selectedColor.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    "px-4 py-2 border rounded-md text-sm transition-all",
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 hover:border-primary"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mb-6">
            <Button className="w-40">Add to Cart</Button>
            <Button variant="outline" className="w-40">
              Buy Now
            </Button>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {productData.description}
          </p>
        </div>
      </div>

      {/* ---- Tabs: Description, Specifications, Reviews ---- */}
      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({productData.reviews.length})
          </TabsTrigger>
        </TabsList>

        {/* Description */}

        {/* Specifications */}
        <TabsContent value="specifications">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            {Object.entries(productData.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b py-2">
                <span className="font-medium">{key}</span>
                <span>{Array.isArray(value) ? value.join(", ") : value}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews">
          <div className="space-y-6">
            {productData.reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{review.name}</p>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={clsx(
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
