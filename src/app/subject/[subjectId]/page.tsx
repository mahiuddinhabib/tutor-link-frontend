"use client"
import ClickableCard from "@/components/ui/ClickableCard";
import Navbar from "@/components/ui/Navbar";
import {
  useServicesBySubjectQuery,
} from "@/redux/api/serviceApi";
import { Col, Row, theme } from "antd";
import React from "react";
const { useToken } = theme;


const CategorizedServices = ({ params }: { params: { subjectId: string } }) => {
  const { token } = useToken();
  const subjectId = params.subjectId;

  const { data, isLoading } = useServicesBySubjectQuery(subjectId);
  // console.log(data);
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
        All {data&&data[0].subject.title} Tuitions
      </h1>

      <Row gutter={[30, 30]} style={{ margin: "50px 10%" }}>
        {data?.map((service: any) => (
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

export default CategorizedServices;
