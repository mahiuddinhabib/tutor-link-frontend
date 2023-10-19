"use client";

import AllServices from "@/components/Services/AllServices";
import ServicesByCategory from "@/components/Services/ServicesByCategory";
import CustomNavbar from "@/components/ui/CustomNavbar";
import { useServicesBySubjectQuery } from "@/redux/api/serviceApi";

const HomePage = () => {
  const { data, isLoading } = useServicesBySubjectQuery(
    "4c141090-d7bc-4fb8-b200-b84407b3baaf"
  );
  console.log(data);

  return (
    <div>
      {/* <Header/> */}
      <CustomNavbar />
      <h1>This is the HOME page</h1>
      <AllServices />
      <ServicesByCategory />
    </div>
  );
};

export default HomePage;
