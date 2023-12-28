import LoginPage from "@/components/Authentication/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Link | Login",
};

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
