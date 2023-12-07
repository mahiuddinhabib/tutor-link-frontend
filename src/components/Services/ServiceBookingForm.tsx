import React from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import CustomModal from "../ui/CustomModal";
import { Button, message } from "antd";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import FormSelectField from "../Forms/FormSelectField";

const ServiceBookingForm = ({
  //   customerId,
  open,
  setOpen,
  availableServices,
}: {
  //   customerId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  availableServices: any;
}) => {
  const { data: userData, isLoading } = useGetProfileQuery(undefined);
  //   console.log(adminData);
  const [updateProfile] = useUpdateProfileMutation();

  const scheduleOptions = availableServices?.map((service: any) => {
    return {
      label: service?.startTime,
      value: service?.id,
      disabled: service?.isBooked,
    };
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      // const res = await updateProfile(values).unwrap();
      //   console.log(res);
      // if (res?.id) {
      //   message.success("Profile Updated!");
      // }
    } catch (err: any) {
      message.error(err.message);
      // console.error(err.message);
    }
    setOpen(false);
  };

  const defaultValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    contactNo: userData?.contactNo || "",
    address: userData?.address || "",
  };
  return (
    <CustomModal
      title="Booking Form"
      isOpen={open}
      closeModal={() => setOpen(false)}
      showCancelButton={false}
      showOkButton={false}
    >
      <>
        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
          Your Personal Info
        </h3>

        <div style={{}}>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                type="text"
                name="name"
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
                type="email"
                name="email"
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
                type="text"
                name="contactNo"
                size="large"
                label="Contact No"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                type="text"
                name="address"
                size="large"
                label="Address"
                required
              />
            </div>
            <div>
              <h3 style={{ margin: "15px 0", textAlign: "center" }}>
                Tuition Info
              </h3>
              <p style={{ marginBottom: "7px" }}>
                Title:{" "}
                {availableServices
                  ? availableServices[0]?.service?.title
                  : "Title"}
              </p>
              <p style={{ marginBottom: "7px" }}>
                Subject:{" "}
                {availableServices
                  ? availableServices[0]?.service?.subjectId
                  : "Title"}
              </p>
              <p style={{ marginBottom: "7px" }}>
                Subject:{" "}
                {availableServices
                  ? availableServices[0]?.service?.tutor?.name
                  : "Tutor"}
              </p>
              <p style={{ marginBottom: "7px" }}>Days: Sun to Thu</p>
              <FormSelectField
                name="availableServiceId"
                options={scheduleOptions}
              />
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ marginTop: "15px" }}
              >
                Place Request
              </Button>
            </div>
          </Form>
        </div>
      </>
    </CustomModal>
  );
};

export default ServiceBookingForm;
