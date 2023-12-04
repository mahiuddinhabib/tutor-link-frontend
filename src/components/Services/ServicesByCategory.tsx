import { useServicesQuery } from "@/redux/api/serviceApi";
import { Card, Col, Row } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import Link from "next/link";

const ServicesByCategory = () => {
  const { data: subjects, isLoading } = useGetSubjectsQuery(undefined);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Tuitions By Subjects
      </h1>
      <Row gutter={[25, 25]} justify="center">
        {subjects?.map((subject: any) => (
          <Col
            xs={24}
            md={8}
            lg={6}
            key={subject?.id}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Link href={`/subject/${subject?.id}`}>
              <Card
                style={{
                  maxWidth: 500,
                  // height: 150,
                  textAlign: "center",
                  padding:"15px",
                  backgroundColor: "gray",
                  margin: "0 auto",
                }}
              >
                <h2>{subject?.title}</h2>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesByCategory;
