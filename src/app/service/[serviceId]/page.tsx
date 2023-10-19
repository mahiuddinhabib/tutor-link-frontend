"use client";

import Form from "@/components/Forms/Form";
import { useGetAvailableServicesQuery } from "@/redux/api/availableServiceApi";
import commonCardImg from "@/assets/common-card-img.jpeg";
import { useSingleServiceQuery } from "@/redux/api/serviceApi";
import { Col, Row, Select, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useAddBookingMutation } from "@/redux/api/bookingApi";
import CustomModal from "@/components/ui/CustomModal";

const ServiceBooking = ({ params }: { params: { serviceId: string } }) => {
  const serviceId = params.serviceId;

  const [open, setOpen] = useState<boolean>(false);
  const [availableServiceId, setAvailableServiceId] = useState<string>("");

  const { data: availableServiceData, isLoading } =
    useGetAvailableServicesQuery(undefined);

  const [addBooking] = useAddBookingMutation();
  // console.log(availableServiceData);

  const availableServices = availableServiceData?.filter(
    (s: any) => s.serviceId === serviceId
  );

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

  return (
    <Row
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

        {/* 
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(registrationSchema)}
          >
            <div>
              <FormInput
                name="name"
                type="text"
                size="large"
                label="Name"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Email"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="contactNo"
                type="text"
                size="large"
                label="Contact No"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="address"
                type="text"
                size="large"
                label="Address"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form>
        </div>
 */}
      </Col>
      <CustomModal
        title="Change Role"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={handleAddBooking}
      >
        <p className="my-5">Do you want to book this service?</p>
      </CustomModal>
    </Row>
  );
};

export default ServiceBooking;
