import React from "react";
import { Carousel, Rate, theme } from "antd";
import Image from "next/image";
import profileImg from "@/assets/profile.png";
import { useGetFeedbacksQuery } from "@/redux/api/feedbackApi";

const { useToken } = theme;

const ReviewCarousel = () => {
  const { token } = useToken();
  const { data, isLoading } = useGetFeedbacksQuery(undefined);
  // console.log(data);
  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          fontSize: token.fontSizeHeading2,
          color:token.colorTextSecondary
        }}>
        See What Others Say
      </h1>
      <Carousel autoplay autoplaySpeed={3000} dots={false}>
        {data?.map((f: any) => (
          <div
            key={f?.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                // backgroundColor: token.colorPrimaryBorder,
                maxWidth: "500px",
                textAlign: "center",
                margin: "0 auto",
                // padding: "40px 20px",
                // borderRadius: "10px",
              }}
            >
              <Image
                src={profileImg}
                height={100}
                width={100}
                alt="USER"
                style={{
                  border: "1px solid gray",
                  borderRadius: "50%",
                  display: "inline",
                }}
              />
              <h3 style={{marginBottom:"10px"}}>{f?.user?.name}</h3>
              <Rate disabled defaultValue={4} />
              <p>
                {f?.service?.title} is {f?.review}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
