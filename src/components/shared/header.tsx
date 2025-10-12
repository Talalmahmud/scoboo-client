import React from "react";
import { NavigationMenuDemo } from "./navigationmenu";
import Cart from "./cart";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className=" sticky top-0 left-0 w-full z-50 border-b-[1px] bg-white border-gray-100">
      <div className=" py-6  flex justify-between  xl:w-6xl mx-auto px-4 lg:px-0 w-full">
        <h2 className=" text-2xl font-semibold">বুনন রঙ</h2>
        <NavigationMenuDemo />
        <div className=" flex items-center gap-2">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Header;
