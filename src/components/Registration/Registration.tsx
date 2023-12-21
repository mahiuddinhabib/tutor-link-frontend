"use client";
import { Button, Col, Input, Row, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserRegistrationMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "@/schemas/registration";
import Link from "next/link";

type FormValues = {
  name: string;
  email: string;
  password: string;
  contactNo: string | undefined;
  address: string | undefined;
  profileImg: string | undefined;
};

const RegistrationPage = () => {
  const [userRegistration] = useUserRegistrationMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    // console.log(data);
    try {
      const res = await userRegistration({
        ...data,
        role: "customer",
        profileImg: "",
      });
      console.log(res);
      message.success("Registration successful!");
      router.push("/login");
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
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First register your account
        </h1>
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
          <p>
            Already have account yet? <Link href={"/login"}>Login here</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default RegistrationPage;
