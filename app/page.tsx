import Hero from "@/components/home/Hero";
import NewArrival from "@/components/products/NewArrival";
import TopSelling from "@/components/products/TopSelling";
import DressStyle from "@/components/products/DressStyle";
import CustomerReviewHome from "@/components/products/CustomerReviewHome";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <NewArrival />
      <TopSelling />
      <DressStyle />
      <CustomerReviewHome />
    </MainLayout>
  );
}
