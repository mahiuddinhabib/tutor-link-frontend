"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Header from "@/components/ui/Header";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { Avatar, Button, message } from "antd";
import commonProfileImg from "@/assets/profile.png";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const UpdateTutorPage = ({ params }: { params: { tutorId: string } }) => {
  const tutorId = params.tutorId;

  const { data: tutorData, isLoading } = useGetSingleUserQuery(tutorId);
  // console.log(tutorData);

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateUser({ id: tutorId, body: values }).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Tutor Updated!");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    name: tutorData?.name || "",
    email: tutorData?.email || "",
    contactNo: tutorData?.contactNo || "",
    address: tutorData?.address || "",
    profileImg: tutorData?.profileImg || "",
  };
  return (
    <div>
      <Header title="Update Tutor" />

      {isLoading || isUpdateLoading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ margin: "auto", maxWidth: "500px", padding: "10px" }}>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  size={100}
                  // icon={<UserOutlined />}
                  src={
                    tutorData?.profileImg || (
                      <Image src={commonProfileImg} alt="tutor profile" />
                    )
                  }
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput type="text" name="name" size="large" label="name" />
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
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ margin: "0 auto" }}
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UpdateTutorPage;
