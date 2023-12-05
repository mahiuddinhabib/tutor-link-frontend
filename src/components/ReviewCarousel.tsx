import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import profileImg from "@/assets/profile.png";
import { useGetFeedbacksQuery } from "@/redux/api/feedbackApi";

const ReviewCarousel = () => {
  const { data, isLoading } = useGetFeedbacksQuery(undefined);
  // console.log(data);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Client Reviews
      </h1>
      <Carousel autoplay dots={false}>
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
                // backgroundColor: "gray",
                height: "160px",
                // lineHeight: "160px",
                textAlign: "center",
              }}
            >
              <Image
                src={profileImg}
                height={100}
                width={100}
                alt="USER"
                style={{
                  border: "5px solid gray",
                  borderRadius: "50%",
                  display: "inline",
                }}
              />
              <h3>{f?.user?.name}</h3>
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
