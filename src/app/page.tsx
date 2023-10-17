"use client";

// import Header from "@/components/ui/Header";
import { useServicesQuery, useSingleServiceQuery } from "@/redux/api/serviceApi";
import { redirect } from "next/navigation";
import { useState } from "react";

const HomePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["search"] = searchTerm;
  /* 
const debouncedTerm = useDebounced({
  searchQuery: searchTerm,
  delay: 600,
});

if (!!debouncedTerm) {
  query["searchTerm"] = debouncedTerm;
}
 */
  const { data, isLoading } = useServicesQuery({});
  // const { data, isLoading } = useSingleServiceQuery("feb8b534-cd0e-4443-a6da-249b2dc9ec94");
  

  console.log(data);

  return (
    <div>
      {/* <Header/> */}
      <h1>This is the HOME page</h1>
    </div>
  );
};

export default HomePage;
