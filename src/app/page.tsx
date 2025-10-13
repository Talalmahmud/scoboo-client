import Hero from "@/components/shared/hero";
import SectionWithTilte from "@/components/shared/section-with-title";
import Image from "next/image";

export default async function Home() {
  const demoProducts = [
    {
      id: "1",
      name: "Handwoven Cotton Saree",
      price: 1250,
      originalPrice: 1600,
      rating: 4.7,
      soldCount: 80,
      colors: [
        {
          colorName: "Red",
          colorCode: "#c0392b",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Blue",
          colorCode: "#2980b9",
          images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Green",
          colorCode: "#27ae60",
          images: [
            "https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1677541205130-51e60e937318?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Handwoven  Saree",
      price: 1250,
      originalPrice: 1600,
      rating: 4.7,
      soldCount: 80,
      colors: [
        {
          colorName: "Red",
          colorCode: "#c0392b",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Blue",
          colorCode: "#2980b9",
          images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Green",
          colorCode: "#27ae60",
          images: [
            "https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1677541205130-51e60e937318?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Handwoven  Saree",
      price: 1250,
      originalPrice: 1600,
      rating: 4.7,
      soldCount: 80,
      colors: [
        {
          colorName: "Red",
          colorCode: "#c0392b",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Blue",
          colorCode: "#2980b9",
          images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Green",
          colorCode: "#27ae60",
          images: [
            "https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1677541205130-51e60e937318?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Handwoven  Saree",
      price: 1250,
      originalPrice: 1600,
      rating: 4.7,
      soldCount: 80,
      colors: [
        {
          colorName: "Red",
          colorCode: "#c0392b",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Blue",
          colorCode: "#2980b9",
          images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1670537994863-5ad53a3214e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
        {
          colorName: "Green",
          colorCode: "#27ae60",
          images: [
            "https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
            "https://plus.unsplash.com/premium_photo-1677541205130-51e60e937318?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
          ],
        },
      ],
    },
  ];

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
  console.log("test", newProductData?.products?.[0]?.attributes?.[0]?.colors);

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
