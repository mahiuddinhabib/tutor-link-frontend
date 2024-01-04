"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Header from "@/components/ui/Header";
import UploadImage from "@/components/ui/UploadImage";
import {
  useSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { Button, message } from "antd";
import Image from "next/image";
import React from "react";

const UpdateServicePage = ({ params }: { params: { serviceId: string } }) => {
  const serviceId = params.serviceId;

  const { data: serviceData, isLoading } = useSingleServiceQuery(serviceId);
  //   console.log(serviceData);

  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateService({ id: serviceId, body: values }).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Service Updated!");
      }
    } catch (err: any) {
        message.error(err.message);
    }
  };

  const defaultValues = {
    title: serviceData?.title || "",
    price: serviceData?.price || "",
  };
  return (
    <div>
      <Header title="Update Service" />

      <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <Image
              src={serviceData?.coverImg || "/common-card-img.jpeg"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
              alt="card image"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput type="text" name="title" size="large" label="Title" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput type="text" name="price" size="large" label="Price" />
            </div>
          </div>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateServicePage;
