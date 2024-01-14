"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Header from "@/components/ui/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import UploadImage from "@/components/ui/UploadImage";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";

import { Button, Col, Row, message } from "antd";

const UpdateSuperAdminProfile = () => {
   const { data, isLoading: userLoading } = useGetProfileQuery(undefined);
   //   console.log(adminData);
   const [updateProfile, { isLoading: userUpdateLoading }] =
     useUpdateProfileMutation();

   const onSubmit = async (values: any) => {
     try {
       const res = await updateProfile(values).unwrap();
       // console.log(res);
       if (res?.id) {
         message.success("Profile Successfully Updated!");
       }
     } catch (err: any) {
       message.error(err.message);
     }
   };

   const defaultValues = {
     name: data?.name || "",
     email: data?.email || "",
     password: data?.password || "",
     contactNo: data?.contactNo || "",
     address: data?.address || "",
     profileImg: data?.profileImg || "",
   };

  return (
    <div>
      <Header title="Your Profile" />
      {userLoading || userUpdateLoading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ margin: "15px" }}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              maxWidth: "500px",
              margin: "0px auto",
              // boxShadow:" 0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100px" }}>
                  <UploadImage
                    name="profileImg"
                    defaultImageUrl={defaultValues.profileImg}
                    listType="picture-circle"
                  />
                </div>
              </div>
              <Row>
                <Col
                  className="gutter-row"
                  span={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="name"
                    size="large"
                    label="name"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="email"
                    name="email"
                    size="large"
                    label="Email"
                    disabled
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="contactNo"
                    size="large"
                    label="Contact No"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="address"
                    size="large"
                    label="Address"
                  />
                </Col>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Button htmlType="submit" type="primary">
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateSuperAdminProfile;
