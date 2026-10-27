
import Image from "next/image";
import Link from "next/link";

type Category = {
  slug: string;
  name: string;
  url: string;
};

const categoryImages: Record<string, string> = {
  smartphones: "/Casual.png",
  laptops: "/Formal.png",
  fragrances: "/Formal.png",
  skincare: "/Casual.png",
  furniture: "/Formal.png",
  groceries: "/Casual.png",
  "mens-shirts": "/Formal.png",
  "mens-shoes": "/Casual.png",
  "mens-watches": "/Formal.png",
  "womens-dresses": "/Casual.png",
  "womens-shoes": "/Formal.png",
  "womens-bags": "/Casual.png",
  "womens-jewellery": "/Formal.png",
  "womens-watches": "/Casual.png",
  "sunglasses": "/Formal.png",
  "motorcycle": "/Casual.png",
  "vehicle": "/Formal.png",
  "home-decoration": "/Casual.png",
  "kitchen-accessories": "/Formal.png",
  "sports-accessories": "/Casual.png",
  "tablets": "/Formal.png",
};

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    "https://dummyjson.com/products/categories",
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  return response.json();
}

export default async function DressStyle() {
  const categories = await fetchCategories();

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

              const image =
                categoryImages[category.slug] ?? "/Casual.png";

              return (
                <Link
                  key={category.slug}
                  href={`/shop/${category.slug}`}
                  className={`relative col-span-1 ${span} h-64 overflow-hidden rounded-2xl sm:h-77`}
                >
                  <Image
                    src={image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, 60vw"
                  />

                  <p className="absolute left-6 top-6 z-10 text-3xl font-bold capitalize text-black sm:left-10 sm:top-7.5 sm:text-4xl">
                    {category.name}
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
