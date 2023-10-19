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
          <h2 style={{fontSize:"35px", marginBottom:"10px"}}>Who We Are</h2>
          <p style={{fontSize:"20px", textAlign:"justify"}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            laboriosam facere tempora temporibus natus odit possimus sequi
            voluptates voluptatibus. Magni nostrum autem vitae debitis soluta
            adipisci voluptas quidem saepe, officiis commodi a laborum, error
            fugit incidunt quasi, exercitationem aut velit assumenda nesciunt
            quo. Impedit eum voluptates commodi doloremque expedita recusandae
            molestias magnam nisi illum omnis ratione delectus atque explicabo
            minima eligendi dolor, quasi velit officiis placeat voluptas
            accusantium. Eum quae necessitatibus eius quas.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
