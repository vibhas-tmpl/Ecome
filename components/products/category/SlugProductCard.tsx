import Image from "next/image";
import Link from "next/link";

import type { TypeProduct } from "@/types/TypeProduct";

type ProductCardProps = {
  product: TypeProduct;
};

const categoryToSlug = (category: string) =>
  category.replace(/'/g, "").replace(/\s+/g, "-");

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${categoryToSlug(product.category)}/product/${product.id}`}
      className="block min-w-0"
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Product name */}
      <p className="mt-4 truncate font-satoshi text-[20px] font-bold">
        {product.title}
      </p>

      {/* Star rating */}
      <div className="mt-1 flex items-center gap-2">
        <div
          className="flex text-3xl leading-none tracking-tight text-yellow-500"
          aria-label={`${product.rating.rate} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const fill =
              product.rating.rate >= index + 1
                ? "★"
                : product.rating.rate >= index + 0.5
                  ? "⯪"
                  : "☆";

            return <span key={index}>{fill}</span>;
          })}
        </div>

        <span className="text-gray-600">{product.rating.rate}/5</span>
      </div>

      {/* Price */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg font-bold text-black sm:text-2xl">
          ${product.price}
        </span>
      </div>
    </Link>
  );
}
