import Hero from "@/components/shared/hero";
import SectionWithTilte from "@/components/shared/section-with-title";
import Image from "next/image";

export default async function Home() {
  const newProductFetch = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/products/public/new/EN"
  );
  const newProductData = await newProductFetch.json();
  const processProduct = newProductData.products.map((data: any) => ({
    id: data.id,
    name: data.translations?.[0]?.name || "Unnamed Product",
    price: data.price - data.price * (data.discount / 100),
    originalPrice: data.price,
    rating: 4.5,
    soldCount: 200,
    colors:
      data.attributes?.flatMap((attr: any) =>
        attr.colors?.map((colorItem: any) => ({
          colorName: colorItem.color.translations?.[0]?.name || "Color",
          colorCode: colorItem.color.code,
          images: attr.images,
        }))
      ) || [],
  }));
  // console.log("test", newProductData?.products?.[0]?.attributes?.[0]?.colors);

  return (
    <div>
      <Hero />
      <SectionWithTilte
        title="New Realese Products"
        productList={newProductData.products}
      />
      {/* <SectionWithTilte
        title="Best Selling Products"
        productList={demoProducts}
      /> */}
    </div>
  );
}
