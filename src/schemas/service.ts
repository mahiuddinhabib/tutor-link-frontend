import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  tutorId: yup.string().required("Tutor is required"),
  price: yup.string().required("Price is required"),
  subjectId: yup.string().required("Subject is required"),
});
