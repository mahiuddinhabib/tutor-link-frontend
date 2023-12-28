"use client";
import { Button, Col, Input, Row, message } from "antd";
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

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
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
    <Row
      justify="center"
      // gutter={48}
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col md={12} lg={8} className="mobileHide">
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
      <Col md={8} lg={6}>
        <h1
          style={{
            margin: "15px 0px",
            textAlign:"center"
          }}
        >
          Login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
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
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <p>
            Don not have account yet? <Link href={'/register'}>Register here</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;