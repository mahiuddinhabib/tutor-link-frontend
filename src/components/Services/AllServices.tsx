import { useServicesQuery } from "@/redux/api/serviceApi";
import { Col, Row, theme } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";

const { useToken } = theme;

const AllServices = () => {
  const { token } = useToken();
  const { data, isLoading } = useServicesQuery({});
  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: token.fontSizeHeading2,
          color: token.colorTextSecondary,
        }}
      >
        Book Your One
      </h1>
      <Row gutter={[25, 25]} justify="center">
        {data?.services?.map((service) => (
          <Col
            // span={8}
            xs={24}
            md={12}
            lg={7}
            key={service?.id}
          >
            <ClickableCard key={service?.id} service={service} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllServices;
