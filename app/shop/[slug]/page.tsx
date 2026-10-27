
import { Suspense } from "react";

import { fetchProducts } from "@/lib/api";
import type { TypeProduct } from "@/types/TypeProduct";

import Breadcrumb from "@/components/products/category/Breadcrumb";
import PriceFilter from "@/components/products/category/PriceFilter";
import ProductCard from "@/components/products/category/SlugProductCard";
import SlugPagination from "@/components/products/category/SlugPagination";
import MainLayout from "@/components/layout/MainLayout";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

const categoryToSlug = (category: string) =>
  category.replace(/'/g, "").replace(/\s+/g, "-");

export default function CategoryPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<p className="p-10">Loading category...</p>}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;

  const allProducts: TypeProduct[] = await fetchProducts();

  const categoryProducts =
    slug.toLowerCase() === "all"
      ? allProducts
      : allProducts.filter(
          (product) =>
            categoryToSlug(product.category).toLowerCase() ===
            slug.toLowerCase(),
        );

  const categoryTitle =
    slug.toLowerCase() === "all"
      ? "All Products"
      : categoryProducts.length > 0
        ? categoryProducts[0].category
        : slug.replaceAll("-", " ");

  const productsPerPage = 9;
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);

  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(
    Math.max(requestedPage, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const visibleProducts = categoryProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <MainLayout>
      <div className="global-container mb-50 border-t border-black/10">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            {
              name: categoryTitle,
              href: `/shop/${slug}`,
            },
          ]}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Filters */}
          <div className="md:col-span-1">
            <PriceFilter />
          </div>

          {/* Products */}
          <section id="products" className="md:col-span-3">
            <p className="mb-5 text-3xl font-bold capitalize">
              {categoryTitle}
            </p>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {categoryProducts.length === 0 && (
              <p className="py-10 text-center text-gray-500">
                No products found in this category.
              </p>
            )}

            {/* Pagination */}
            {categoryProducts.length > 0 && (
              <SlugPagination
                totalProducts={categoryProducts.length}
                productsPerPage={productsPerPage}
              />
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
