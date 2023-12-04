import { Col, Row } from "antd";
import Image from "next/image";
import commonCardImg from "@/assets/common-card-img.jpeg";

const Overview = () => {
  return (
    <div style={{marginTop:"60px"}}>
      <Row gutter={{md:50}} justify="center">
        <h2
          className="mobileMenuIcon"
          style={{ fontSize: "35px", marginBottom: "25px" }}
        >
          Who We Are
        </h2>
        <Col xs={24} sm={24} md={12} lg={10}>
          <Image
            src={commonCardImg}
            width={0}
            height={0}
            // sizes="100vw"
            alt="card image"
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={8}
          style={
            {
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "flex-start",
            }
          }
        >
          <h2
            className="desktopMenu"
            style={{ fontSize: "35px", marginBottom: "20px" }}
          >
            Who We Are
          </h2>
          <p
            style={{
              fontSize: "20px",
              textAlign: "justify",
              marginTop:"15px"
            }}
          >
            Welcome to Tutor Link! We believe in the transformative power of
            education. We are committed to connecting students with exceptional
            tutors, facilitating effective learning experiences, and fostering a
            vibrant community of learners.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
