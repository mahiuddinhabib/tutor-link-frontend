import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "minimum 6")
    .max(16, "maximum 16")
    .required("Name is required"),
  // role: yup.string().required("Role is required"),
  contactNo: yup.string(),
  address: yup.string(),
  profileImg: yup.string(),
});
