import React from "react";
import { NavigationMenuDemo } from "./navigationmenu";
import Cart from "./cart";
import Link from "next/link";
import MobileSideBar from "./mobile-sidebar";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className=" sticky top-0 left-0 w-full z-50 border-b-[1px] bg-white border-gray-100">
      <div className=" py-6  flex justify-between  xl:w-6xl mx-auto px-4 lg:px-0 w-full">
        <div className=" flex flow-row items-center gap-1">
          <MobileSideBar />
          <Link href={"/"}>
            <h2 className=" text-2xl font-semibold">বুনন রঙ</h2>
          </Link>
        </div>
        <div className=" hidden md:block">
          {" "}
          <NavigationMenuDemo />
        </div>
        <div className=" flex items-center gap-2">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Header;
