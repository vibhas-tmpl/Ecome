
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "/Pants.png",
    rating: 4.5,
    price: 120,
    discount: 20,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "/Pants.png",
    rating: 3.5,
    price: 240,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: "/Pants.png",
    rating: 4.5,
    price: 180,
    discount: 30,
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "/Pants.png",
    rating: 4,
    price: 130,
  },
];

export default function TopSelling() {
  return (
    <section className="w-full py-12 sm:py-21 ">
        <div className="global-container">
      {/* Section heading */}
      <div className="mb-12">
        <h1 className="text-center font-heading text-4xl font-bold sm:text-6xl">
          TOP SELLING
        </h1>
      </div>

      {/* Product cards */}
      <div className=" grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-4 ">
        {products.map((product) => (
          <div key={product.id} className="min-w-0">
            {/* Product image */}
            <div className="relative aspect-3/3 overflow-hidden rounded-3xl bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Product name */}
            <p className="mt-4 truncate font-satoshi font-bold text-[20px] ">
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
                <div className="flex justify-between items-center">
                    <span className="flex shrink-0 text-sm leading-none text-gray-600">
                    {product.rating}/5
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
            {/* Discounted price — show only when discount exists */}
            {product.discount && (
                <span className="text-lg font-bold text-black sm:text-2xl">
                ${Math.round(product.price * (1 - product.discount / 100))}
                </span>
            )}

            {/* Original price */}
            <span
                className={`text-lg font-bold sm:text-2xl ${
                product.discount ? "text-gray-400 line-through" : "text-black"
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
          </div>
        ))}
      </div>

      {/* View All button */}
      <div className=" mt-8 flex justify-center sm:mt-10">
        <button
          type="button"
          className="w-full rounded-full border font-satoshi border-black/10 px-20 py-3 text-sm font-bold transition hover:bg-black hover:text-white sm:w-auto"
        >
          View All
        </button>
      </div>
      </div>
    </section>
  );
}
