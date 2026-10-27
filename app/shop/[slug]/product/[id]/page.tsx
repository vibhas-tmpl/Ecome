
import { notFound } from "next/navigation";

import { fetchProductById } from "@/lib/api";
import SingleProductHero from "@/components/products/singleproduct/singleProductHero";
import BreadCrumb from "@/components/products/singleproduct/BreadCrumb";
import ProductTabs from "@/components/products/singleproduct/ProductTabs";
import YouMightLike from "@/components/products/singleproduct/YouMightLike";
import MainLayout from "@/components/layout/MainLayout";

type Props = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug, id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  let product;

  try {
    product = await fetchProductById(productId);
  } catch (error) {
    console.error("Failed to load product:", productId, error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="global-container">
        <BreadCrumb slug={slug} productName={product.title} />
      </div>

      <SingleProductHero product={product} slug={slug} />

      <ProductTabs />
      <YouMightLike />
    </MainLayout>
  );
}
