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
import { useAddBookingMutation } from "@/redux/api/bookingApi";

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

  const [addBooking] = useAddBookingMutation();

  const scheduleOptions = availableServices?.map((service: any) => {
    return {
      label: service?.startTime,
      value: service?.id,
      disabled: service?.isBooked || service?.isRequested,
    };
  });

  const onSubmit = async (values: any) => {
    const { availableServiceId, ...userData } = values;
    console.log(availableServiceId, userData);

    try {
      await updateProfile(userData).unwrap();
      const res = await addBooking({
        availableServiceId,
      }).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Profile Updated!");
      }
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
        <h4 style={{ textAlign: "center", marginTop: "15px" }}>
          Your Personal Info
        </h4>

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
              <h4 style={{ marginTop: "15px", textAlign: "center" }}>
                Tuition Info
              </h4>
              <p style={{ marginBottom: "7px" }}>
                Title:{" "}
                {availableServices
                  ? availableServices[0]?.service?.title
                  : "Title"}
              </p>
              <p style={{ marginBottom: "7px" }}>
                Subject:{" "}
                {availableServices
                  ? availableServices[0]?.service?.subject?.title
                  : "Title"}
              </p>
              <p style={{ marginBottom: "7px" }}>
                Tutor:{" "}
                {availableServices
                  ? availableServices[0]?.service?.tutor?.name
                  : "Tutor"}
              </p>
              <p style={{ marginBottom: "7px" }}>Days: Sun - Thu</p>
              <FormSelectField
                name="availableServiceId"
                placeholder="Select A Schedule"
                options={scheduleOptions}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
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
