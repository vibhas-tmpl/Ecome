import React, { ReactNode } from "react";
import AnouncmentBar from "@/components/layout/AnouncmentBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AnouncmentBar />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
