"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Header from "@/components/ui/Header";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { Avatar, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

const UpdateCustomerPage = ({ params }: { params: { customerId: string } }) => {
  const customerId = params.customerId;

  const { data: customerData, isLoading } = useGetSingleUserQuery(customerId);
  //   console.log(customerData);

  const [updateUser] = useUpdateUserMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    try {
      const res = await updateUser({ id: customerId, body: values }).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Customer Updated!");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    name: customerData?.name || "",
    email: customerData?.email || "",
    contactNo: customerData?.contactNo || "",
    address: customerData?.address || "",
    profileImg: customerData?.profileImg || "",
  };
  return (
    <div>
      <Header title="Update Customer" />

      <div style={{ margin: "auto", maxWidth: "500px", padding: "10px" }}>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Avatar
              size={100}
              icon={<UserOutlined />}
              // src={customerData?.profileImg}
            />
          </div>
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
              <FormInput type="text" name="name" size="large" label="Name" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput type="email" name="email" size="large" label="Email" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                type="text"
                name="contactNo"
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
                type="text"
                name="address"
                size="large"
                label="Address"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ margin: "0 auto" }}
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCustomerPage;
