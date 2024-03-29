import { useServicesQuery } from "@/redux/api/serviceApi";
import { Card, Col, Row, theme } from "antd";
import React from "react";
import ClickableCard from "../ui/ClickableCard";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import Link from "next/link";
import Bg1 from "@/assets/bg1.png";

const { useToken } = theme;

const ServicesByCategory = () => {
  const { token } = useToken();
  const { data: subjects, isLoading } = useGetSubjectsQuery(undefined);
  return (
    <div
      style={{
        backgroundImage: `url(${Bg1.src})`,
        // backgroundPositionX: "-30%",
        // backgroundPositionY: "170%",
        backgroundSize: "90%",
        // backgroundRepeatY: "no-repeat",
        // opacity:"50%",
        padding: "50px 0",
        backgroundColor: token.colorPrimaryBgHover,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: token.fontSizeHeading2,
          color: token.colorTextSecondary,
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
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <Col
                key={i}
                xs={24}
                md={8}
                lg={6}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Card
                  loading
                  style={{
                    maxWidth: 500,
                    backgroundColor: token.colorPrimaryBorder,
                    // margin: "0 auto",
                    color: token.colorSuccessActive,
                  }}
                ></Card>
              </Col>
            ))
          : subjects?.map((subject: any) => (
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
                    style={{
                      border: "none",
                      textAlign: "center",
                      padding: "30px 0",
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
