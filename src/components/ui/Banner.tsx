// import { Box, Button, Typography } from "@mui/material";
import React from "react";
import BannerImg from "@/assets/BannerImg.png";
import VectorImg1 from "@/assets/vector1.png";
import VectorImg2 from "@/assets/vector2.png";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <>
      <Row>
        <Col
          xs={24}
          md={12}
          style={{
            // backgroundColor: "skyblue",
            backgroundImage: `url(${VectorImg2.src})`,
            backgroundPositionX: "-30%",
            backgroundPositionY: "170%",
            backgroundSize: "60%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="bannerDiv"
            style={{
              //   backgroundColor: "skyblue",
              width: "80%",
              // textAlign: "start",
            }}
          >
            <h1 style={{ fontSize: "45px" }}>
              Elevate Your Learning Experience
            </h1>
            <p
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                fontSize: "18px",
              }}
            >
              Tutor Link is a one-stop solution for all your academic needs. We
              provide you with the best tutors to help you achieve your academic
              goals.
            </p>
            <Link href={"/login"}>
              <Button size="large" type="primary" shape="round">
                Join Now
              </Button>
            </Link>
          </div>
        </Col>
        <Col
          md={12}
          className="desktopMenu"
          style={{
            // backgroundColor: "skyblue",
            backgroundImage: `url(${VectorImg1.src})`,
            backgroundPositionX: "115%",
            backgroundPositionY: "-105%",
            backgroundSize: "50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src={BannerImg}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", marginTop: "8rem" }}
            alt="Banner Image"
          />
        </Col>
      </Row>
    </>
  );
};

export default Banner;
