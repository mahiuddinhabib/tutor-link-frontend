import * as yup from "yup";

export const availableServiceSchema = yup.object().shape({
  serviceId: yup.string().required("service Id is required"),
  startTime: yup.string().required("start Time is required"),
});
