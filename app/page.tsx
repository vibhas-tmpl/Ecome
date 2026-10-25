import AnouncmentBar from "@/components/layout/AnouncmentBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import NewArrival from "@/components/products/NewArrival";
import TopSelling from "@/components/products/TopSelling";
import DressStyle from "@/components/products/DressStyle";
import CustomerReviewHome from "@/components/products/CustomerReviewHome";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <div >
      <AnouncmentBar />
      <Navbar />
      <Hero />
      <NewArrival />
      <TopSelling />
      <DressStyle />
      <CustomerReviewHome />
      <Footer />
    </div>
  );
}
