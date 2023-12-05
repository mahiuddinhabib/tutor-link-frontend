import { useServicesQuery } from "@/redux/api/serviceApi";
import { Card, Col, Row, theme } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import Link from "next/link";

const { useToken } = theme;

const ServicesByCategory = () => {
  const { token } = useToken();
  const { data: subjects, isLoading } = useGetSubjectsQuery(undefined);
  return (
    <div
      style={{
        maxWidth: "1920px",
        margin: "0 auto",
        padding: "50px 0",
        backgroundColor: token.colorPrimaryBgHover,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: token.fontSizeHeading2,
          color:token.colorTextSecondary
        }}
      >
        Tuitions By Subjects
      </h1>
      <Row
        gutter={[25, 25]}
        justify="center"
        className="container"
        style={{ margin: "0 auto" }}
      >
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
                hoverable
                // bordered
                style={{
                  maxWidth: 500,
                  // height: 150,
                  // borderColor: token.colorPrimaryBorderHover,
                  border: "none",
                  textAlign: "center",
                  padding: "30px",
                  backgroundColor: token.colorPrimaryBorder,
                  margin: "0 auto",
                  color: token.colorSuccessActive,
                }}
              >
                <h2 style={{ fontSize: token.fontSizeHeading3 }}>
                  {subject?.title}
                </h2>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesByCategory;
