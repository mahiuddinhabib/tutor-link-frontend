import { useServicesQuery } from "@/redux/api/serviceApi";
import { Col, Row } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";

const AllServices = () => {
  const { data, isLoading } = useServicesQuery({});
  return (
    <div style={{ margin: "30px 10%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Services</h1>
      <Row gutter={[30, 30]}>
        {data?.services?.map((service) => (
          <Col
            span={8}
            key={service?.id}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <ClickableCard key={service?.id} service={service} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllServices;
