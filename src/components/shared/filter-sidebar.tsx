"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Star, Filter, ArrowLeft } from "lucide-react";
import clsx from "clsx";

// --- Demo Data ---
const categories = ["T-shirt", "Shirt", "Pants", "Jacket", "Saree"];
const sizes = ["S", "M", "L", "XL"];
const colors = ["#D72638", "#217A2D", "#F9C74F", "#4361EE", "#8338EC"];
const ratings = [5, 4, 3, 2, 1];

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const toggleItem = (value: string, list: string[], setList: Function) => {
    if (list.includes(value)) setList(list.filter((v) => v !== value));
    else setList([...list, value]);
  };

  const filterProps = {
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    selectedRating,
    setSelectedRating,
    toggleItem,
  };

  return (
    <div>
      {/* --- Desktop Sidebar --- */}
      <div className="w-full md:w-64 md:block hidden bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <FilterContent {...filterProps} />
        <Button className="w-full mt-4">Apply Filters</Button>
      </div>

      {/* --- Mobile Sheet --- */}
      <div className="md:hidden flex justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Filter size={16} /> Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex flex-col h-full p-0">
            {/* Fixed Header */}
            <SheetHeader className="p-4 border-b flex flex-row justify-between px-4  w-full items-center">
              <SheetClose>
                <div className=" flex items-center gap-1">
                  <ArrowLeft size={16} />
                  Back to Shopping
                </div>
              </SheetClose>
              <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
            </SheetHeader>

            {/* Scrollable Middle Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <FilterContent {...filterProps} />
            </div>

            {/* Fixed Footer */}
            <div className="border-t px-4 py-3 bg-white">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// --- Reusable FilterContent Component ---
function FilterContent({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedRating,
  setSelectedRating,
  toggleItem,
}: any) {
  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Category */}
      <div>
        <h3 className="text-sm font-medium mb-2">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() =>
                  toggleItem(cat, selectedCategories, setSelectedCategories)
                }
              />
              <span className="text-sm">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={10000}
          step={100}
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>৳ {priceRange[0]}</span>
          <span>৳ {priceRange[1]}</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-sm font-medium mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              onClick={() => toggleItem(size, selectedSizes, setSelectedSizes)}
              className="rounded-md"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => toggleItem(c, selectedColors, setSelectedColors)}
              className={clsx(
                "w-7 h-7 rounded-full border transition-all",
                selectedColors.includes(c)
                  ? "ring-2 ring-primary scale-110"
                  : "hover:ring-2 hover:ring-gray-300"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-medium mb-2">Rating</h3>
        <div className="space-y-1">
          {ratings.map((r) => (
            <div
              key={r}
              onClick={() => setSelectedRating(r)}
              className={clsx(
                "flex items-center gap-1 cursor-pointer text-sm text-gray-600",
                selectedRating === r && "text-primary font-medium"
              )}
            >
              {[...Array(r)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span>&nbsp;and up</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
