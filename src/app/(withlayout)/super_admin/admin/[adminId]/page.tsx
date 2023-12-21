"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { Button, message } from "antd";
import React from "react";

const UpdateAdminPage = ({ params }: { params: { adminId: string } }) => {
  const adminId = params.adminId;

  const { data: adminData, isLoading } = useGetSingleUserQuery(adminId);
  //   console.log(adminData);

  const [updateUser] = useUpdateUserMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    try {
      const res = await updateUser({ id: adminId, body: values }).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Admin Updated!");
      }
    } catch (err: any) {
        message.error(err.message);
    }
  };

  const defaultValues = {
    name: adminData?.name || "",
    email: adminData?.email || "",
    contactNo: adminData?.contactNo || "",
    address: adminData?.address || "",
    profileImg: adminData?.profileImg || "",
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Update This Profile
      </h1>

      <div style={{ margin: "auto", width: "50%" }}>
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

export default UpdateAdminPage;
