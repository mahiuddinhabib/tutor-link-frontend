import RegistrationPage from "@/components/Authentication/Registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TL | Registration",
};

const Register = () => {
  return (
    <>
      <RegistrationPage />
    </>
  );
};

export default Register;
