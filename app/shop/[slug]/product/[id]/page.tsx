import { Suspense } from "react";

import { products } from "@/data/products";
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

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="p-10">Loading product...</p>}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Props) {
  const { slug, id } = await params;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product || product.category !== slug) {
    return (
      <main>
        <AnouncmentBar />
        <Navbar />

        <div className="global-container py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main>
        <AnouncmentBar />
        <Navbar />
        <BreadCrumb slug={slug}  productName={product.name}/>
        <SingleProductHero product={product} slug={slug} />
        <ProductTabs />
        <YouMightLike />
        <Footer />
    </main>
  );
}