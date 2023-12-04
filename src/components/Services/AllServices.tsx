import { useServicesQuery } from "@/redux/api/serviceApi";
import { Col, Row } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";

const AllServices = () => {
  const { data, isLoading } = useServicesQuery({});
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Services</h1>
      <Row gutter={[25, 25]} justify="center">
        {data?.services?.map((service) => (
          <Col
            // span={8}
            xs={24}
            md={12}
            lg={7}
            key={service?.id}
            // style={{display:"flex", justifyContent: "center", alignItems: "center"}}
          >
            <ClickableCard key={service?.id} service={service} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllServices;
