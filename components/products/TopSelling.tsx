
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import type { TypeProduct } from "@/types/TypeProduct";

export default function TopSelling() {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();

        const topSellingProducts = data.filter(
          (product) => product.rating.rate > 4.5
        );

        setProducts(topSellingProducts);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 4);

  function getCategorySlug(category: string) {
    const slugs: Record<string, string> = {
      "men's clothing": "mens-clothing",
      "women's clothing": "womens-clothing",
      electronics: "electronics",
      jewelery: "jewelery",
    };

    return slugs[category.toLowerCase()] ?? "casual";
  }

  return (
    <section className="w-full py-12 sm:py-21">
      <div className="global-container">
        {/* Section heading */}
        <div className="mb-12">
          <h1 className="text-center font-heading text-4xl font-bold sm:text-6xl">
            TOP SELLING
          </h1>
        </div>

        {/* Loading and error states */}
        {loading ? (
          <p className="py-10 text-center">
            Loading top-rated products...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center">
            No products with a rating above 4.5 were found.
          </p>
        ) : (
          <>
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
              {visibleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${getCategorySlug(product.category)}/product/${product.id}`}
                  className="
                    block w-[70%] shrink-0 snap-start min-w-0
                    sm:w-auto sm:shrink
                  "
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 639px) 70vw, (max-width: 1023px) 45vw, 25vw"
                      className="object-contain p-5"
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
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>
                          {product.rating.rate >= index + 1
                            ? "★"
                            : product.rating.rate >= index + 0.5
                              ? "⯪"
                              : "☆"}
                        </span>
                      ))}
                    </div>

                    <span className="text-gray-600">
                      {product.rating.rate}/5
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-2">
                    <span className="text-lg font-bold sm:text-2xl">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All / Show Less */}
            {products.length > 4 && (
              <div className="mt-8 flex justify-center sm:mt-10">
                <button
                  type="button"
                  onClick={() => setShowAll((previous) => !previous)}
                  className="
                    w-full rounded-full border border-black/10
                    px-20 py-3 font-satoshi text-sm font-bold
                    transition hover:bg-black hover:text-white sm:w-auto
                  "
                >
                  {showAll ? "Show Less" : "View All"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
