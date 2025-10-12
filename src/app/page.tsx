import Hero from "@/components/shared/hero";
import SectionWithTilte from "@/components/shared/section-with-title";
import Image from "next/image";

export default function Home() {
  const demoProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      price: 99,
      originalPrice: 129,
      rating: 4.6,
      soldCount: 240,
    },
    {
      id: "2",
      name: "Smart Watch",
      image:
        "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      price: 149,
      originalPrice: 199,
      rating: 4.8,
      soldCount: 320,
    },
    {
      id: "3",
      name: "Gaming Mouse",
      image:
        "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      price: 59,
      originalPrice: 89,
      rating: 4.3,
      soldCount: 180,
    },
    {
      id: "4",
      name: "Laptop Stand",
      image:
        "https://images.unsplash.com/photo-1641057349981-48bdca8fe870?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhcHRvcCUyMHN0YW5kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
      price: 39,
      rating: 4.1,
      soldCount: 95,
    },
    {
      id: "5",
      name: "Bluetooth Speaker",
      image:
        "https://images.unsplash.com/photo-1529359744902-86b2ab9edaea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900",
      price: 89,
      originalPrice: 119,
      rating: 4.7,
      soldCount: 150,
    },
  ];

  return (
    <div>
      <Hero />
      <SectionWithTilte
        title="New Realese Products"
        productList={demoProducts}
      />
      <SectionWithTilte
        title="Best Selling Products"
        productList={demoProducts}
      />
    </div>
  );
}
