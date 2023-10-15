import RegistrationPage from "@/components/Registration/Registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TL | Registration",
};

const Login = () => {
  return (
    <>
      <RegistrationPage />
    </>
  );
};

export default Login;
