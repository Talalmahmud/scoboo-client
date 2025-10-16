"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import FilterSidebar from "@/components/shared/filter-sidebar";
import ProductCard from "@/components/product/ProductCard"; // 👈 Reuse ProductCard
import { useSearchParams } from "next/navigation";
import api from "@/utils/axios";

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

  const filteredProducts = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const fetchProducts = async () => {
    try {
      const fetchData = await api.get(
        `/products/public/search/?${searchParmas.toString()}`
      );
      const fetchReesult = await fetchData.data;
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
