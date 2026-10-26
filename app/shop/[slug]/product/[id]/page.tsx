
import { notFound } from "next/navigation";

import { fetchProductById } from "@/lib/api";
import AnouncmentBar from "@/components/layout/AnouncmentBar";
import Navbar from "@/components/layout/Navbar";
import SingleProductHero from "@/components/products/singleproduct/singleProductHero";
import Footer from "@/components/layout/Footer";
import BreadCrumb from "@/components/products/singleproduct/BreadCrumb";
import ProductTabs from "@/components/products/singleproduct/ProductTabs";
import YouMightLike from "@/components/products/singleproduct/YouMightLike";

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

  const product = await fetchProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <AnouncmentBar />
      <Navbar />

      <div className="global-container">
        <BreadCrumb
          slug={slug}
          productName={product.title}
        />
      </div>

      <SingleProductHero
        product={product}
        slug={slug}
      />

      <ProductTabs />
      <YouMightLike />
      <Footer />
    </main>
  );
}
