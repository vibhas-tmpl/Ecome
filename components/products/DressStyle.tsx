import React from "react";
import Image from "next/image";
import Link from "next/link";

type Category = {
  id: number;
  category: string;
  slug: string;
  image: string;
};

const categories: Category[] = [
  {
    id: 1,
    category: "Electronics",
    slug: "electronics",
    image: "/Casual.png",
  },
  {
    id: 2,
    category: "Jewelery",
    slug: "jewelery",
    image: "/Formal.png",
  },
  {
    id: 3,
    category: "Men's Clothing",
    slug: "mens-clothing",
    image: "/Formal.png",
  },
  {
    id: 4,
    category: "Women's Clothing",
    slug: "womens-clothing",
    image: "/Casual.png",
  },
];

export default function DressStyle() {
  return (
    <section className="w-full">
      <div className="global-container rounded-[48px] bg-search-background">
        <div className="mx-4 py-10 sm:mx-8 sm:py-16 lg:mx-18 lg:py-20">
          <div className="mb-10 sm:mb-15.5">
            <h1 className="text-center font-heading text-3xl font-bold sm:text-6xl">
              BROWSE BY CATEGORY
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-8">
            {categories.map((category, index) => {
              const isNarrow = index % 4 === 0 || index % 4 === 3;

              const span = isNarrow ? "sm:col-span-3" : "sm:col-span-5";

              return (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className={`relative col-span-1 ${span} h-64 overflow-hidden rounded-2xl sm:h-77`}
                >
                  <Image
                    src={category.image}
                    alt={category.category}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, 60vw"
                  />

                  <p className="absolute left-6 top-6 z-10 text-3xl font-bold text-black sm:left-10 sm:top-7.5 sm:text-4xl">
                    {category.category}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
