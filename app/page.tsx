import AnouncmentBar from "@/components/layout/AnouncmentBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import NewArrival from "@/components/products/NewArrival";
import TopSelling from "@/components/products/TopSelling";


export default function Home() {
  return (
    <div >
      <AnouncmentBar />
      <Navbar />
      <Hero />
      <NewArrival />
      <TopSelling />
      
    </div>
  );
}
