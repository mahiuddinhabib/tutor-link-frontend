"use client";

import Form from "@/components/Forms/Form";
import { useGetAvailableServicesQuery } from "@/redux/api/availableServiceApi";
import commonCardImg from "@/assets/common-card-img.jpeg";
import commonProfileImg from "@/assets/profile.png";
import {
  SolutionOutlined,
  CalendarOutlined,
  SnippetsOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  List,
  Rate,
  Row,
  theme,
} from "antd";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import CustomFooter from "@/components/ui/CustomFooter";
import FormTextArea from "@/components/Forms/FormTextArea";
import {
  useAddFeedbackMutation,
  useGetFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import ServiceBookingForm from "@/components/Services/ServiceBookingForm";
import { isLoggedIn } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { useGetFAQsQuery } from "@/redux/api/faqApi";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Meta } = Card;
const { useToken } = theme;

const ServiceBooking = ({ params }: { params: { serviceId: string } }) => {
  const serviceId = params.serviceId;

  useLayoutEffect(() => {
    const userLoggedIn = isLoggedIn();
    if (!userLoggedIn) {
      redirect("/login");
    }
  }, []);

  const { token } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState(0);

  const { data: availableServiceData, isLoading: isServiceLoading } =
    useGetAvailableServicesQuery(undefined);

  const { data: FAQs, isLoading: isFAQLoading } = useGetFAQsQuery(undefined);

  const availableServices = availableServiceData?.filter(
    (s: any) => s.serviceId === serviceId
  );

  const { data: feedback, isLoading: isFeedbackLoading } =
    useGetFeedbacksQuery(undefined);

  const [addFeedback] = useAddFeedbackMutation();

  const feedbackData = feedback?.filter((f: any) => f.serviceId === serviceId);

  const onSubmit = async (values: any) => {
    try {
      const res = await addFeedback({
        ...values,
        rating,
        serviceId,
      }).unwrap();
      console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
    setRating(0);
  };

  return (
    <>
      <Navbar />
      <Row
        className="container"
        gutter={[15, 15]}
        style={{ margin: "0 auto", marginTop: token.sizeXL }}
      >
        <Col xs={{ span: 24, order: 2 }} md={{ span: 15, order: 1 }}>
          <h3 style={{ fontSize: token.fontSizeHeading2 }}>
            {availableServices ? availableServices[0]?.service?.title : "Title"}
          </h3>
          <p style={{ marginTop: token.sizeSM }}>
            This courses offer a comprehensive curriculum, interactive lessons,
            and expert guidance tailored for all levels of learners. Immerse
            yourself in flexible and engaging learning experiences, designed to
            provide practical insights and foster confidence in your
            understanding of the subject.
          </p>
          <h3
            style={{
              fontSize: token.fontSizeXL,
              marginTop: token.size,
            }}
          >
            Instructor
          </h3>
          <Card style={{ marginTop: token.sizeSM }} loading={isServiceLoading}>
            <Meta
              avatar={
                <Avatar
                  size={60}
                  src={<Image src={commonProfileImg} alt="tutor profile" />}
                />
              }
              title={
                availableServices
                  ? availableServices[0]?.service?.tutor?.name
                  : "Tutor Name"
              }
              description="BSc. in Bangla (BUET), MSc. in Rocketry (MIT)"
            />
          </Card>

          <h3
            style={{
              fontSize: token.fontSizeXL,
              marginTop: token.sizeXL,
              marginBottom: token.sizeMD,
            }}
          >
            Frequently Asked Questions
          </h3>
          <Collapse
            accordion
            defaultActiveKey="0"
            items={
                FAQs?.map((faq:any, index: number) => ({
                key: index,
                label: faq?.question,
                children: faq?.answer,
              }))
            }
          />

          <Card style={{ textAlign: "center", marginTop: token.sizeXL }}>
            <h3 style={{ marginBottom: token.sizeXS }}>Give a Feedback</h3>
            <Rate
              tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
              allowClear
              style={{ fontSize: 30, marginBottom: token.sizeXS }}
              onChange={setRating}
              value={rating}
            />
            <div style={{ display: `${rating ? "block" : "none"}` }}>
              <Form submitHandler={onSubmit}>
                <FormTextArea
                  name="review"
                  placeholder="Write your feedback here"
                  rows={5}
                />
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ marginTop: token.sizeSM }}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Card>
          <h3 style={{ marginTop: token.sizeXL, fontSize: token.fontSizeXL }}>
            Reviews
          </h3>
          <List
            itemLayout="horizontal"
            style={{ marginBottom: token.sizeXXL }}
            dataSource={feedbackData}
            loading={isFeedbackLoading}
            renderItem={(item: any, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={<Image src={commonProfileImg} alt="tutor profile" />}
                    />
                  }
                  title={item?.user?.name}
                  description={
                    <>
                      <Rate
                        style={{ fontSize: token.fontSize, color: "inherit" }}
                        value={item?.rating}
                      />{" "}
                      <br />
                      {item?.review}
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 9, order: 2 }}>
          <Card
            style={{
              margin: `${token.sizeXL} auto `,
            }}
            cover={
              <Image
                src={commonCardImg}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="card image"
              />
            }
          >
            <Meta
              // style={{ textAlign: "center" }}
              title={
                <>
                  <h2 style={{ display: "inline-block" }}>
                    Only $
                    {availableServices
                      ? availableServices[0]?.service?.price
                      : "Price"}
                  </h2>
                  <span style={{ color: "gray" }}>/month</span>
                </>
              }
            />
            <Button
              block
              size="large"
              type="primary"
              style={{ margin: `${token.size}px 0` }}
              onClick={() => setOpen(true)}
            >
              BOOK THIS TUITION
            </Button>
            <List
              className="desktopMenu"
              dataSource={[
                {
                  desc: "4 days per week",
                  icon: <CalendarOutlined />,
                },
                {
                  desc: "Predefined schedule",
                  icon: <FieldTimeOutlined />,
                },
                {
                  desc: "Provide helpful materials",
                  icon: <SnippetsOutlined />,
                },
                {
                  desc: "Special care for week students",
                  icon: <SolutionOutlined />,
                },
              ]}
              renderItem={(item) => (
                <List.Item style={{ border: "none", padding: "5px 0" }}>
                  <Avatar
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "black",
                      marginRight: "10px",
                    }}
                    icon={item.icon}
                  />
                  {item.desc}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <ServiceBookingForm
        open={open}
        setOpen={setOpen}
        availableServices={availableServices}
      />
      <CustomFooter />
    </>
  );
};

export default ServiceBooking;
