import { ProductCard, type ProductCardProps } from "./ProductCard";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";

export function ProductGrid({ products }: { products: ProductCardProps[] }) {
  return (
    <StaggerList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <StaggerItem key={p.slug}>
          <ProductCard {...p} />
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
