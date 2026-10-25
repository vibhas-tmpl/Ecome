
import Image from "next/image";
import Link from "next/link";

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
    <section className="w-full py-12 sm:py-21">
      <div className="global-container">
        {/* Section heading */}
        <div className="mb-12">
          <h1 className="text-center font-heading text-4xl font-bold sm:text-6xl">
            TOP SELLING
          </h1>
        </div>

        {/* Product cards */}
        <div
          className="
            flex gap-4 overflow-x-auto scroll-smooth pb-4
            snap-x snap-mandatory
            sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6
            sm:overflow-visible sm:pb-0
            lg:grid-cols-4
          "
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/casual/product/${product.id}`}
              className="
                block w-[70%] shrink-0 snap-start min-w-0
                sm:w-auto sm:shrink
              "
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 639px) 70vw, (max-width: 1023px) 45vw, 25vw"
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

                <p className=" text-gray-600">
                  {product.rating}/5
                </p>
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
          ))}
        </div>

        {/* View All button */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            className="w-full rounded-full border border-black/10 px-20 py-3 font-satoshi text-sm font-bold transition hover:bg-black hover:text-white sm:w-auto"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
