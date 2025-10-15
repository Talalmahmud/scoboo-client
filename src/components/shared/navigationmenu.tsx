"use client";

import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  const [linkList, setLinkList] = useState<any[]>([]);
  const fetchCategory = async () => {
    try {
      const fetchData = await api.get("/categories/BN/public");
      const fetchResult = await fetchData.data;
      setLinkList(fetchResult.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  console.log(linkList);
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {linkList?.map((item: any) => (
          <NavigationMenuItem key={item?.id}>
            <NavigationMenuTrigger>
              <Link href={"/"}>{item?.name}</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[100px] gap-4">
                {item?.subcategories?.map((subItem: any) => (
                  <li key={subItem?.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/search/?categoryId=${item.id}&categoryId=${subItem.id}`}
                        className="flex-row items-center gap-2"
                      >
                        <Image
                          src={subItem?.logo}
                          height={16}
                          width={16}
                          className=" h-4 w-4"
                          alt={subItem?.id}
                          priority
                        />
                        {subItem.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/search/?categoryId=${item.id}`}
                      className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200"
                    >
                      View All →
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
