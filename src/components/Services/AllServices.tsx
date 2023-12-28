import { useServicesQuery } from "@/redux/api/serviceApi";
import { Card, Col, Row, theme } from "antd";
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
        {isLoading ? (
          [...Array(3)].map((_, i) => (
          <Col
            xs={24}
            md={12}
            lg={7}
            key={i}
          >
            <Card
              loading
              style={{
                minHeight: "400px",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
            </Card>
          </Col>
        ))
        ) : (
          data?.services?.map((service) => (
            <Col
              // span={8}
              xs={24}
              md={12}
              lg={7}
              key={service?.id}
            >
              <ClickableCard key={service?.id} service={service} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default AllServices;
