"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import Header from "@/components/ui/Header";
import {
  useAddServiceMutation,
} from "@/redux/api/serviceApi";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { serviceSchema } from "@/schemas/service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import React from "react";

const CreateServicePage = () => {

  const { data: users, isLoading: isUserLoading } = useGetUsersQuery(undefined);
  const {data: subjects, isLoading: isSubjectLoading} = useGetSubjectsQuery(undefined)
  //   console.log(serviceData);
  const tutors = users?.filter((b: any) => b.role === "tutor");

  const tutorOptions = tutors?.map((user: any) => {
      return {
        label: user?.name,
        value: user?.id,
      };
  });

  const subjectOptions = subjects?.map((subject: any) => {
      return {
        label: subject?.title,
        value: subject?.id,
      };
  });

  console.log(subjectOptions);

  const [addService] = useAddServiceMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    try {
      const res = await addService(values).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Service Created!");
      }
    } catch (err: any) {
        message.error(err.message);
    }
  };

  return (
    <div>
      <Header title="Create New Service" />

      <div style={{ margin: "auto", width: "50%", padding:"10px" }}>
        <Form submitHandler={onSubmit} resolver={yupResolver(serviceSchema)}>
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
                margin: "15px 0px",
              }}
            >
              <FormInput
                type="text"
                name="title"
                size="large"
                label="Title"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormSelectField
                size="large"
                name="tutorId"
                options={tutorOptions as SelectOptions[]}
                label="Tutor"
                placeholder="Select"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormSelectField
                size="large"
                name="subjectId"
                options={subjectOptions as SelectOptions[]}
                label="Subject"
                placeholder="Select"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput type="text" name="price" size="large" label="Price" required/>
            </div>
          </div>
          <Button htmlType="submit" type="primary">
            Create Service
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateServicePage;
