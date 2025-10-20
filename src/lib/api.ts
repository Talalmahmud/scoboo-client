export const fetchProductById = async (productId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
