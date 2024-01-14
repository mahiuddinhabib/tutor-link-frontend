"use client";
import ClickableCard from "@/components/ui/ClickableCard";
import Navbar from "@/components/ui/Navbar";
import { useServicesBySubjectQuery } from "@/redux/api/serviceApi";
import { useSingleSubjectQuery } from "@/redux/api/subjectApi";
import { Card, Col, Row, theme } from "antd";
import React from "react";
const { useToken } = theme;

const CategorizedServices = ({ params }: { params: { subjectId: string } }) => {
  const { token } = useToken();
  const subjectId = params.subjectId;

  const { data: subjectData } = useSingleSubjectQuery(subjectId);
  const { data, isLoading } = useServicesBySubjectQuery(subjectId);

  return (
    <div>
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          margin: "30px 0",
          fontSize: token.fontSizeHeading2,
          color: token.colorTextSecondary,
        }}
      >
        All {subjectData?.title} Tuitions
      </h1>

      <Row gutter={[30, 30]} style={{ margin: "50px 10%" }}>
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <Col
              span={8}
              key={item}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Card
              loading
              style={{
                minHeight: "400px",
                maxWidth: 500,
                margin: "0 auto",
              }}
            />
            </Col>
          ))
        ) : data?.length ? (
          data?.map((service: any) => (
            <Col
              span={8}
              key={service?.id}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <ClickableCard key={service?.id} service={service} />
            </Col>
          ))
        ) : (
          <Col
            span={24}
            style={{
              textAlign: "center",
              color: token.colorTextSecondary,
            }}
          >
            <h3>No Tuitions Found for {subjectData?.title}!</h3>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CategorizedServices;
