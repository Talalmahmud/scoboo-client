"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "../context/CartContext";

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

type Size = {
  id: string;
  size: {
    id: string;
    title: string;
    description: string;
  };
};

type ProductAttribute = {
  id: string;
  stock: number | 0;
  images: string[];
  sizes: Size[];
  colors: ProductAttributeColor[];
};

type Product = {
  id: string;
  translations: any;
  price: number;
  discount: number;
  rating?: number;
  soldCount?: number;
  specifications?: string;
  metaTitle?: string;
  metaDescription?: string;
  attributes: ProductAttribute[];
};

type Props = {
  product: Product;
};

export default function ProductDetailsPage({ product }: Props) {
  const [selectedAttribute, setSelectedAttribute] = useState(
    product?.attributes[0]
  );
  const [selectedImage, setSelectedImage] = useState(
    selectedAttribute?.images[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState("specifications");

  const { addToCart, cart } = useCart(); // ✅ Access context

  const handleAddToCart = () => {
    if (!selectedAttribute) {
      alert("Please select a color first");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    const firstColor = selectedAttribute.colors[0]?.color?.id;

    addToCart({
      productId: product.id,
      sizeId: selectedSize,
      colorId: firstColor,
      quantity: 1,
    });

    alert("Product added to cart!");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-0 space-y-12">
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

          <div className="flex flex-wrap gap-3">
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
            {product.price > product.discount && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                -
                {Math.round(
                  ((product.price - product.discount) / product.price) * 100
                )}
                %
              </span>
            )}
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
                    "w-8 h-8 rounded-full border-2 p-1 transition-all",
                    selectedAttribute?.id === colorVariant.id
                      ? "border-primary ring-2 ring-primary/30 scale-110"
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
              {selectedAttribute?.sizes?.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.size.id)}
                  className={clsx(
                    "px-4 py-2 border rounded-md text-sm transition-all",
                    selectedSize === size.size.id
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 hover:border-primary"
                  )}
                >
                  {size?.size?.title}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mb-6">
            <Button className="w-40" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" className="w-40">
              Buy Now
            </Button>
          </div>

          <li className="text-gray-700 leading-relaxed">{`test`}</li>
        </div>
      </div>

      {/* ---- Tabs ---- */}
      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (4)</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications">
          <div className="grid grid-cols-1 gap-4 text-slate-700">
            {product?.specifications ? (
              <div
                dangerouslySetInnerHTML={{ __html: product.specifications }}
              />
            ) : (
              <p>No specifications available for this product.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">{/* reviews placeholder */}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
