"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Header from "@/components/ui/Header";
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/redux/api/profileApi";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";

const ChangePasswordPage = () => {
  const [changePassword, { isLoading: userUpdateLoading }] =
    useChangePasswordMutation();

  const onSubmit = async (values: any) => {
    if(values.newPassword !== values.confirmPassword){
      message.error("New Password and Confirm Password must be same!");
      return;
    }
    values = delete values.confirmPassword;
    console.log(values);
    try {
      const res = await changePassword(values).unwrap();
      console.log(res);
      if (res?.email) {
        message.success("Password Successfully Updated!");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <>
      <Header title="Change Password" />
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
      >
        <Col
          sm={12}
          md={8}
          lg={8}
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            maxWidth: "500px",
            margin: "0px auto",
            // boxShadow:" 0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <Form submitHandler={onSubmit}>
              <div>
                <FormInput
                  name="oldPassword"
                  type="password"
                  size="large"
                  label="Old Password"
                  required
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput
                  name="newPassword"
                  type="password"
                  size="large"
                  label="New Password"
                  required
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput
                  name="confirmPassword"
                  type="password"
                  size="large"
                  label="Confirm Password"
                  required
                />
              </div>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ChangePasswordPage;
