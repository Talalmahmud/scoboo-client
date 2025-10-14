import React from "react";
import ProductCardSlider from "./product-card-slider";

type Props = {
  title: string;
  productList: any[];
};

const SectionWithTilte = ({ title, productList }: Props) => {

  return (
    <div className=" w-full py-8">
      <div className='xl:w-6xl mx-auto px-4 lg:px-0 w-full"'>
        <p className=" text-3xl font-semibold font-sans pb-4">{title}</p>
        <ProductCardSlider products={productList} />
      </div>
    </div>
  );
};

export default SectionWithTilte;
