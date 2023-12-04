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
    <>
      {/* <CustomNavbar /> */}
      <Navbar />
      <div className="container">
        <AllServices />
        <ServicesByCategory />
        <Overview />
        <ReviewCarousel />
      </div>
        <CustomFooter />
    </>
  );
};

export default HomePage;
