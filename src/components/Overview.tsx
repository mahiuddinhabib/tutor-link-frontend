import { Col, Row } from "antd";
import Image from "next/image";
import commonCardImg from "@/assets/common-card-img.jpeg";

const Overview = () => {
  return (
    <div style={{ margin: "100px 10%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Overview</h1>
      <Row justify="space-evenly" align="middle">
        <Col sm={12} md={16} lg={10}>
          <Image src={commonCardImg} width={500} alt="login image" />
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h2 style={{ fontSize: "35px", marginBottom: "10px" }}>Who We Are</h2>
          <p style={{ fontSize: "20px", textAlign: "justify" }}>
            Welcome to Tutor Link, your one-stop platform for seamless and
            effective tutoring services. Whether you are a student seeking
            academic support or a dedicated tutor looking to share your
            expertise, our platform offers a comprehensive range of features to
            make your educational journey a breeze. expertise, our platform
            offers a comprehensive range of features to make your educational
            journey a breeze.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
