"use client"
import ClickableCard from "@/components/ui/ClickableCard";
import Navbar from "@/components/ui/Navbar";
import {
  useServicesBySubjectQuery,
} from "@/redux/api/serviceApi";
import { Col, Row } from "antd";
import React from "react";

const CategorizedServices = ({ params }: { params: { subjectId: string } }) => {
  const subjectId = params.subjectId;

  const { data, isLoading } = useServicesBySubjectQuery(subjectId);
  return (
    <div>
      <Navbar />

      <Row gutter={[30, 30]} style={{ margin: "50px 10%"}}>
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
