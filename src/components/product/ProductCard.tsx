"use client";

import { useState } from "react";
import clsx from "clsx";
import { Star } from "lucide-react";
import { Product } from "./ProductCardSlider";
import ProductImageSlider from "./ProductImageSlider";
import ColorSelector from "./ColorSelector";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 bg-white">
      {/* Image Slider */}
      <div className="relative h-64 w-full overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            -{discount}%
          </span>
        )}
        <ProductImageSlider
          images={selectedColor.images}
          colorName={selectedColor.colorName}
          productName={product.name}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold line-clamp-1">{product.name}</h3>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-lg font-bold text-primary">Tk {product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              Tk {product.originalPrice}
            </p>
          )}
        </div>

        {/* Rating */}
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

        {/* Color Selector */}
        {product.colors.length > 1 && (
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
        )}
      </div>
    </div>
  );
}
