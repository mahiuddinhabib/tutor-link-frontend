"use client";

import Overview from "@/components/Overview";
import ReviewCarousel from "@/components/ReviewCarousel";
import AllServices from "@/components/Services/AllServices";
import ServicesByCategory from "@/components/Services/ServicesByCategory";
import Banner from "@/components/ui/Banner";
import CustomFooter from "@/components/ui/CustomFooter";
import CustomNavbar from "@/components/ui/CustomNavbar";
import Navbar from "@/components/ui/Navbar";
import { theme } from "antd";

const { useToken } = theme;

const HomePage = () => {
  const { token } = useToken();
  return (
    <>
        <Navbar />
      <div className="containerLg">
        <Banner />
      </div>
      <div className="container">
        <div style={{ marginTop: token.sizeXXL}} />
        <AllServices />
      </div>
        <div style={{ marginTop: token.sizeXXL }} />
        <ServicesByCategory />
        <div style={{ marginTop: token.sizeXXL }} />
        <Overview />
        <div style={{ marginTop: token.sizeXXL }} />
        <ReviewCarousel />
      <div style={{ marginTop: token.sizeXXL }} />
      <CustomFooter />
    </>
  );
};

export default HomePage;
