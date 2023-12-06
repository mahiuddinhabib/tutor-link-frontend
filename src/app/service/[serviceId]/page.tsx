"use client";

import Form from "@/components/Forms/Form";
import { useGetAvailableServicesQuery } from "@/redux/api/availableServiceApi";
import commonCardImg from "@/assets/common-card-img.jpeg";
import commonProfileImg from "@/assets/profile.png";
import { useSingleServiceQuery } from "@/redux/api/serviceApi";
import {
  Affix,
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  List,
  Rate,
  Row,
  message,
} from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import CustomModal from "@/components/ui/CustomModal";
import Navbar from "@/components/ui/Navbar";
import CustomFooter from "@/components/ui/CustomFooter";
import FormTextArea from "@/components/Forms/FormTextArea";
import {
  useAddFeedbackMutation,
  useGetFeedbacksQuery,
} from "@/redux/api/feedbackApi";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Meta } = Card;

const ServiceBooking = ({ params }: { params: { serviceId: string } }) => {
  const serviceId = params.serviceId;

  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [availableServiceId, setAvailableServiceId] = useState<string>("");

  const { data: availableServiceData, isLoading: isServiceLoading } =
    useGetAvailableServicesQuery(undefined);

  const availableServices = availableServiceData?.filter(
    (s: any) => s.serviceId === serviceId
  );

  const [addBooking] = useAddBookingMutation();
  // console.log(availableServiceData);

  const { data: feedback, isLoading: isFeedbackLoading } =
    useGetFeedbacksQuery(undefined);

  const [addFeedback] = useAddFeedbackMutation();

  const feedbackData = feedback?.filter((f: any) => f.serviceId === serviceId);

  // console.log(availableServices);

  const scheduleOptions = availableServices?.map((service: any) => {
    return {
      label: service?.startTime,
      value: service?.id,
      disabled: service?.isBooked,
    };
  });

  const handleAddBooking = async () => {
    console.log(availableServiceId);
    try {
      const res = await addBooking({
        availableServiceId,
      }).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Booking Pending");
        setOpen(false);
      } else {
        message.error("Another user requested for this service");
        setOpen(false);
      }
    } catch (err: any) {
      message.error(err.message);
      setOpen(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const res = await addFeedback({
        ...values,
        rating,
        serviceId
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
      <Row className="container" gutter={[15, 15]} style={{ margin: "0 auto" }}>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 15, order: 1 }}>
          <h3>
            {availableServices ? availableServices[0]?.service?.title : "Title"}
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, porro
            inventore repellat et error similique quidem quia unde quisquam
            tempore. Lorem ipsum dolor sit amet.
          </p>
          <h3>Instructor</h3>
          <Card style={{}} loading={isServiceLoading}>
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
          <h3>What Will Be Covered</h3>
          <List
            bordered
            dataSource={[
              {
                desc: "Ant Design Title 1",
              },
              {
                desc: "Ant Design Title 2",
              },
              {
                desc: "Ant Design Title 3",
              },
              {
                desc: "Ant Design Title 4",
              },
            ]}
            renderItem={(item) => (
              <List.Item style={{ border: "none" }}>
                <Avatar
                  style={{ marginRight: "10px" }}
                  src={<Image src={commonProfileImg} alt="tutor profile" />}
                />
                {item.desc}
              </List.Item>
            )}
          />
          <h3>Frequently Asked Questions</h3>
          <Collapse
            accordion
            items={[
              {
                key: "1",
                label: "This is panel header 1",
                children: <p>{text}</p>,
              },
              {
                key: "2",
                label: "This is panel header 2",
                children: <p>{text}</p>,
              },
              {
                key: "3",
                label: "This is panel header 3",
                children: <p>{text}</p>,
              },
            ]}
          />

          <Card style={{ textAlign: "center" }}>
            <h3>Give a Feedback</h3>
            <Rate
              tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
              allowClear
              style={{ fontSize: 30 }}
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
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form>
            </div>
          </Card>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={feedbackData}
              renderItem={(item: any, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          <Image src={commonProfileImg} alt="tutor profile" />
                        }
                      />
                    }
                    title={item?.user?.name}
                    description={item?.review}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 9, order: 2 }}>
          <Card
            style={{
              minHeight: "400px",
              maxWidth: 400,
              // border:"1px solid gray",
              // boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.3)",
              margin: "0 auto",
            }}
            cover={
              <Image
                src={commonCardImg}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="card image"
                // width={300}
                // style={{ height: "auto" }}
                // alt="card image here"
              />
            }
          >
            <Meta
              title={
                <>
                  Only{" "}
                  {availableServices
                    ? availableServices[0]?.service?.price
                    : "Price"}{" "}
                  Tk / Month
                </>
              }
            />
            <Button block size="large" type="primary">
              BOOK THIS TUITION
            </Button>
            <List
              className="desktopMenu"
              dataSource={[
                {
                  desc: "4 days per week",
                },
                {
                  desc: "Predefined schedule",
                },
                {
                  desc: "Provide helpful materials",
                },
                {
                  desc: "Special care for week students",
                },
              ]}
              renderItem={(item) => (
                <List.Item style={{ border: "none" }}>
                  <Avatar
                    style={{ marginRight: "10px" }}
                    src={<Image src={commonProfileImg} alt="tutor profile" />}
                  />
                  {item.desc}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <CustomFooter />
      {/* ----------------don't touch anyway--------------------- */}
      {/* <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={commonCardImg} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h3>
          {availableServices ? availableServices[0]?.service?.title : "Title"}
        </h3>
        <p>
          Instructor:{" "}
          {availableServices
            ? availableServices[0]?.service?.tutor?.name
            : "Tutor"}
        </p>
        <p>
          Price:{" "}
          {availableServices ? availableServices[0]?.service?.price : "Price"}
        </p>
        <p>Book this service</p>
        <Select
          placeholder="Select Schedule"
          allowClear
          style={{ width: 300 }}
          onChange={(value) => {
            if (value) {
              setAvailableServiceId(value);
              setOpen(true);
            }
          }}
          options={scheduleOptions}
        />
      </Col>
      <CustomModal
        title="Change Role"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={handleAddBooking}
      >
        <p className="my-5">Do you want to book this service?</p>
      </CustomModal>
    </Row> */}
    </>
  );
};

export default ServiceBooking;
