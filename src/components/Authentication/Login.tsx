"use client";
import { Button, Col, Divider, Input, Radio, Row, message } from "antd";
import loginImage from "@/assets/login-img.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import Link from "next/link";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      // console.log(data);
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        router.push("/");
        message.success("Login successful!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div
      style={{
        // backgroundColor: "red",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 15px",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          maxWidth: "900px",
        }}
      >
        <Col md={12} xs={0}>
          <Image
            src={loginImage}
            width={500}
            alt="login image"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Col>
        <Col
          style={{
            padding: "30px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "400px",
          }}
          sm={24}
          md={12}
        >
          <h1
            style={{
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Login your account
          </h1>
          <div>
            <Form
              submitHandler={onSubmit}
              defaultValues={defaultValues}
              resolver={yupResolver(loginSchema)}
            >
              <div>
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
                  margin: "25px 0px",
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
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form>
            <p style={{ marginTop: "10px" }}>
              Don not have account yet?{" "}
              <Link href={"/register"}>Register here</Link>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Radio.Group
                value={defaultValues}
                onChange={(e) => setDefaultValues(e.target.value)}
              >
                <Radio.Button
                  value={{
                    email: "super.admin@tl.com",
                    password: "123456super.admin",
                  }}
                >
                  Super Admin
                </Radio.Button>
                <Radio.Button
                  value={{
                    email: "admin@tl.com",
                    password: "123456admin",
                  }}
                >
                  Admin
                </Radio.Button>
                <Radio.Button
                  value={{
                    email: "customer01@tl.com",
                    password: "123456",
                  }}
                >
                  Customer
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
