"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MenuIcon, ChevronDown } from "lucide-react";
import api from "@/utils/axios";
import Link from "next/link";

const MobileSideBar = () => {
  const [linkList, setLinkList] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 🔹 Fetch categories
  const fetchCategory = async () => {
    try {
      const res = await api.get("/categories/BN/public");
      setLinkList(res.data?.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon size={24} className="text-gray-800" />
        </SheetTrigger>

        <SheetContent side="left" className="w-[80%] sm:w-[60%]">
          <SheetHeader>
            <SheetTitle>
              <span className="text-2xl font-semibold text-primary">
                বুনন রঙ
              </span>
            </SheetTitle>
            <SheetDescription>
              Browse categories and explore our products.
            </SheetDescription>
          </SheetHeader>

          {/* 🔹 Category List */}
          <div className="flex flex-col mt-3 gap-2 overflow-y-auto flex-1">
            {linkList.map((category, index) => (
              <Collapsible
                key={category.id}
                open={openIndex === index}
                onOpenChange={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className=" px-3"
              >
                <CollapsibleTrigger className="flex  w-full items-center justify-between px-3 py-2 text-base font-medium rounded-md">
                  {category.name}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>

                {/* 🔸 Subcategories */}
                <CollapsibleContent className="pl-5 pt-2 w-full space-y-1">
                  {category.subcategories &&
                  category.subcategories.length > 0 ? (
                    category.subcategories.map((sub: any) => (
                      <Link
                        key={sub.id}
                        href={`/category/${sub.slug}`}
                        className="block text-sm text-gray-700 hover:text-primary py-1"
                      >
                        {sub.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      No subcategories
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <SheetFooter className="mt-4 border-t pt-3 text-sm text-gray-500">
            © {new Date().getFullYear()} বুনন রঙ
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideBar;
