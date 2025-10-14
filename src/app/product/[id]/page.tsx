import ProductDetailsPage from "@/components/product/ProductPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const fetchProduct = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/products/public/${id}/?language=EN`
  );
  const product = await fetchProduct.json();
  console.log(product);
  return (
    <div>
      <ProductDetailsPage product={product.data} />
    </div>
  );
}
