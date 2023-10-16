"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { Button, message } from "antd";
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
    //   console.error(err.message);
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
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>Update You Profile</h1>

      <div style={{margin: "auto", width:"50%"}}>
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
              <FormInput type="text" name="name" size="large" label="name" />
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
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCustomerPage;
