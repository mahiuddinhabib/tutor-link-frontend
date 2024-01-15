"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import loginImage from "@/assets/login-img.png";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [updateProfile, { isLoading: userUpdateLoading }] =
    useUpdateProfileMutation();

  const onSubmit = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New Password and Confirm Password must be same!");
      return;
    }
    values = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      const res = await updateProfile(values).unwrap();
      if (res?.id) {
        message.success("Password Successfully Updated!");
        router.push("/admin");
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
        padding: "10px",
      }}
    >
      <Col xs={0} lg={8}>
        <Image
          src={loginImage}
          width={0}
          height={0}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="login image"
        />
      </Col>
      <Col
        xs={24}
        lg={8}
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "5px",
          padding: "15px",
          maxWidth: "500px",
          // margin: "10px",
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
  );
};

export default ChangePasswordPage;
