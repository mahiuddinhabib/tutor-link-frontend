"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Header from "@/components/ui/Header";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { Avatar, Button, message } from "antd";
import Image from "next/image";
import commonProfileImg from "@/assets/profile.png";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const UpdateAdminPage = ({ params }: { params: { adminId: string } }) => {
  const adminId = params.adminId;

  const { data: adminData, isLoading } = useGetSingleUserQuery(adminId);
  //   console.log(adminData);

  const [updateUser, {isLoading:isUpdateLoading}] = useUpdateUserMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    try {
      const res = await updateUser({ id: adminId, body: values }).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Admin Updated!");
      }
    } catch (err: any) {
        message.error(err.message);
    }
  };

  const defaultValues = {
    name: adminData?.name || "",
    email: adminData?.email || "",
    contactNo: adminData?.contactNo || "",
    address: adminData?.address || "",
    profileImg: adminData?.profileImg || "",
  };
  return (
    <div>
      <Header title="Update Admin" />

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
                    adminData?.profileImg || (
                      <Image src={commonProfileImg} alt="customer profile" />
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

export default UpdateAdminPage;
