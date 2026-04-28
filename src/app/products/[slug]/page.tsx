import { MOCK_PRODUCTS } from "@/lib/products-data";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS[slug] ?? MOCK_PRODUCTS["math-quest"];

  return <ProductDetailClient slug={slug} product={product} />;
}
