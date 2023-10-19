import { useServicesQuery } from "@/redux/api/serviceApi";
import { Card, Col, Row } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import Link from "next/link";

const ServicesByCategory = () => {
  const { data: subjects, isLoading } = useGetSubjectsQuery(undefined);
  return (
    <div style={{ margin: "100px 10%" }}>
      <h1 style={{ textAlign: "center", marginBottom:"50px" }}>Tuitions By Subjects</h1>
      <Row gutter={[30, 30]}>
        {subjects?.map((subject: any) => (
          <Col
            span={6}
            key={subject?.id}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Link href={`/subject/${subject?.id}`}>
              <Card
                style={{
                  width: 300,
                  height: 150,
                  textAlign: "center",
                  backgroundColor: "gray",
                }}
              >
                <h2 style={{ marginTop: "35px" }}>{subject?.title}</h2>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesByCategory;
