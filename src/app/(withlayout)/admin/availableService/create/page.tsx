"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import Header from "@/components/ui/Header";
import {
  useAddAvailableServiceMutation,
  useSingleAvailableServiceQuery,
  useUpdateAvailableServiceMutation,
} from "@/redux/api/availableServiceApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import { availableServiceSchema } from "@/schemas/availableService";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import React from "react";

const CreateAvailableServicePage = () => {

  const { data: availableServices, isLoading: isUserLoading } =
    useServicesQuery({});

  const availableServiceOptions = availableServices?.services?.map((availableService: any) => {
    return {
      label: availableService?.title,
      value: availableService?.id,
    };
  });

  const [addAvailableService] = useAddAvailableServiceMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    // console.log(values);
    try {
      const res = await addAvailableService(values).unwrap();
      console.log(res);
      if (res?.id) { //etar moto kore f_key delete handle korbo
        message.success("Available Service Created!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Header title="Create Available Service" />

      <div style={{ margin: "auto", width: "50%", padding:"10px" }}>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(availableServiceSchema)}
        >
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
              <FormSelectField
                size="large"
                name="serviceId"
                options={availableServiceOptions as SelectOptions[]}
                label="Service"
                placeholder="Select"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                type="text"
                name="startTime"
                size="large"
                label="Start Time"
                placeholder="eg: 10AM"
                required
              />
            </div>
          </div>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateAvailableServicePage;
