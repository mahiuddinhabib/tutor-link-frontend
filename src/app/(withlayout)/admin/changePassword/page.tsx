"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import loginImage from "../../assets/login-image.png";

import { useUpdateProfileMutation } from "@/redux/api/profileApi";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";

const ChangePasswordPage = () => {
  const [updateProfile, { isLoading: userUpdateLoading }] =
    useUpdateProfileMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateProfile(values).unwrap();
      if (res?.id) {
        message.success("Password Successfully Updated!");
      }
    } catch (err: any) {
      message.error(err.message);
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
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
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
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Change Password
        </h1>
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
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePasswordPage;
