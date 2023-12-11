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
        <Col xs={24} sm={24} md={12} lg={8} className="joinDiv">
          <h2
            className="desktopMenu"
            style={{ fontSize: "35px", marginBottom: "20px" }}
          >
            Want to Be a Tutor?
          </h2>
          <p
            style={{
              fontSize: "18px",
              textAlign: "justify",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            Are you passionate about sharing knowledge and helping students
            succeed? Tutor Link welcomes skilled and enthusiastic individuals to
            join our team of tutors and help students achieve their academic and
            professional goals. Join us today and become a part of the Tutor Link family!
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
