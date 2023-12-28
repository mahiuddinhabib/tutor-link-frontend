"use client";
import { Button, Col, Input, Row, message } from "antd";
import registerImage from "@/assets/registration-img.png";
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
            src={registerImage}
            width={500}
            alt="registration image"
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
            Register your account
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
                  margin: "25px 0px",
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
                  marginBottom: "25px",
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
                Register
              </Button>
            </Form>
            <p style={{ marginTop: "10px" }}>
              Already have account yet? <Link href={"/login"}>Login here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationPage;
