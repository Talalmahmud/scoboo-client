"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Star, Filter, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import api from "@/utils/axios";
import { toast } from "sonner";

export interface CategoryTranslation {
  id?: string;
  language: string;
  name: string;
  slug: string;
}
export interface Category {
  id?: string;
  logo?: string | null;
  translations: CategoryTranslation[];
}

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([500, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || res.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  // --- Helper: Update URL Params (preserve previous) ---
  const updateParam = useCallback(
    (key: string, value: string | string[] | number | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (typeof value === "number" && value !== null) {
        params.set(key, value.toString());
      } else if (typeof value === "string" && value.trim() !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  // --- Sync filters from URL on load ---
  useEffect(() => {
    const min = Number(searchParams.get("minPrice")) || 500;
    const max = Number(searchParams.get("maxPrice")) || 5000;
    const cats = searchParams.get("categories")?.split(",") || [];
    const szs = searchParams.get("sizes")?.split(",") || [];
    const cols = searchParams.get("colors")?.split(",") || [];
    const rate = searchParams.get("rating")
      ? Number(searchParams.get("rating"))
      : null;

    setPriceRange([min, max]);
    setSelectedCategories(cats);
    setSelectedSizes(szs);
    setSelectedColors(cols);
    setSelectedRating(rate);
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Helper: toggle list values ---
  const toggleItem = (
    value: string,
    list: string[],
    setList: Function,
    key: string
  ) => {
    const newList = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    setList(newList);
    updateParam(key, newList);
  };

  // --- Sync price range to params (on change stop) ---
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    updateParam("minPrice", value[0]);
    updateParam("maxPrice", value[1]);
  };

  // --- Sync rating ---
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    updateParam("rating", rating);
  };

  const filterProps = {
    priceRange,
    handlePriceChange,
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    selectedRating,
    handleRatingChange,
    categories,
    toggleItem,
  };

  return (
    <div>
      {/* --- Desktop Sidebar --- */}
      <div className="w-full md:w-64 md:block hidden bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <FilterContent {...filterProps} />
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
            <SheetHeader className="p-4 border-b flex flex-row justify-between w-full items-center">
              <SheetClose>
                <div className="flex items-center gap-1">
                  <ArrowLeft size={16} /> Back to Shopping
                </div>
              </SheetClose>
              <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <FilterContent {...filterProps} />
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
  handlePriceChange,
  categories,
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedRating,
  handleRatingChange,
  toggleItem,
}: any) {
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["#D72638", "#217A2D", "#F9C74F", "#4361EE", "#8338EC"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Category */}
      <div>
        <h3 className="text-sm font-medium mb-2">Category</h3>
        <div className="space-y-2">
          {categories.map((cat: Category) => (
            <div key={cat.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCategories.includes(cat.id!)}
                onCheckedChange={() =>
                  toggleItem(
                    cat.id!,
                    selectedCategories,
                    setSelectedCategories,
                    "categories"
                  )
                }
              />
              <span className="text-sm">
                {cat.translations.find((t) => t.language === "BN")?.name || "-"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
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
              onClick={() =>
                toggleItem(size, selectedSizes, setSelectedSizes, "sizes")
              }
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
              onClick={() =>
                toggleItem(c, selectedColors, setSelectedColors, "colors")
              }
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
              onClick={() => handleRatingChange(r)}
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
