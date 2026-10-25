
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    image: string;
    rating: number;
    price: number;
    discount?: number;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/casual/product/${product.id}`}
      className="block min-w-0"
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Product name */}
      <p className="mt-4 truncate font-satoshi text-[20px] font-bold">
        {product.name}
      </p>

      {/* Star rating */}
      <div className="mt-1 flex items-center gap-2">
        <div
          className="flex text-3xl leading-none tracking-tight text-yellow-500"
          aria-label={`${product.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const fill =
              product.rating >= index + 1
                ? "★"
                : product.rating >= index + 0.5
                  ? "⯪"
                  : "☆";

            return <span key={index}>{fill}</span>;
          })}
        </div>

        <span className="text-gray-600">{product.rating}/5</span>
      </div>

      {/* Price */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {/* Discounted price */}
        {product.discount && (
          <span className="text-lg font-bold text-black sm:text-2xl">
            $
            {Math.round(
              product.price * (1 - product.discount / 100)
            )}
          </span>
        )}

        {/* Original price */}
        <span
          className={`text-lg font-bold sm:text-2xl ${
            product.discount
              ? "text-gray-400 line-through"
              : "text-black"
          }`}
        >
          ${product.price}
        </span>

        {/* Discount percentage */}
        {product.discount && (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-500">
            -{product.discount}%
          </span>
        )}
      </div>
    </Link>
  );
}
