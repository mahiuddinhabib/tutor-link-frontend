"use client";

import Overview from "@/components/Overview";
import ReviewCarousel from "@/components/ReviewCarousel";
import AllServices from "@/components/Services/AllServices";
import ServicesByCategory from "@/components/Services/ServicesByCategory";
import CustomFooter from "@/components/ui/CustomFooter";
import CustomNavbar from "@/components/ui/CustomNavbar";
import Navbar from "@/components/ui/Navbar";

const HomePage = () => {

  return (
    <div>
      {/* <CustomNavbar /> */}
      <Navbar/>
      <AllServices />
      {/* <ServicesByCategory /> */}
      {/* <Overview /> */}
      <ReviewCarousel />
      <CustomFooter />
    </div>
  );
};

export default HomePage;
