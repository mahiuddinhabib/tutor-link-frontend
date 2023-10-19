import { useServicesQuery } from "@/redux/api/serviceApi";
import { Col, Row } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";

const AllServices = () => {
  const { data, isLoading } = useServicesQuery({});
  return (
    <Row gutter={[30, 30]} style={{ margin: "0px 10%" }}>
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
  );
};

export default AllServices;
