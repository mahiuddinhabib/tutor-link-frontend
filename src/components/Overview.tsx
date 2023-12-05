import { Button, Col, Row } from "antd";
import Image from "next/image";
import tutor from "@/assets/tutor.png";

const Overview = () => {
  return (
    <div className="container">
      <Row gutter={{ md: 50 }} justify="center">
        <h2
          className="mobileMenuIcon"
          style={{ fontSize: "35px", marginBottom: "25px" }}
        >
          Want to Be a Tutor?
        </h2>
        <Col xs={24} sm={24} md={12} lg={10}>
          <Image
            src={tutor}
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
          className="joinDiv"
        >
          <h2
            className="desktopMenu"
            style={{ fontSize: "35px", marginBottom: "20px" }}
          >
            Want to Be a Tutor?
          </h2>
          <p
            style={{
              fontSize: "20px",
              textAlign: "justify",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            Welcome to Tutor Link! We believe in the transformative power of
            education. We are committed to connecting students with exceptional
            tutors, facilitating effective learning experiences, and fostering a
            vibrant community of learners.
          </p>
          <Button size="large" type="primary" shape="round">
            Join Our Team
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
