"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useSingleAvailableServiceQuery, useUpdateAvailableServiceMutation } from "@/redux/api/availableServiceApi";
import { Button, message } from "antd";
import React from "react";

const UpdateAvailableServicePage = ({ params }: { params: { availableServiceId: string } }) => {
  const availableServiceId = params.availableServiceId;

  const { data: availableServiceData, isLoading } = useSingleAvailableServiceQuery(availableServiceId);
  //   console.log(availableServiceData);

  const [updateAvailableService] = useUpdateAvailableServiceMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    try {
      const res = await updateAvailableService({ id: availableServiceId, body: values }).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Available service updated!");
      }
    } catch (err: any) {
      //   console.error(err.message);
    }
  };

  const defaultValues = {
    startTime: availableServiceData?.startTime || "",
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Update Schedule
      </h1>

      <div style={{ margin: "auto", width: "50%" }}>
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
                margin: "15px 0px",
              }}
            >
              <FormInput
                type="text"
                name="startTime"
                size="large"
                label="Start Time"
              />
            </div>
          </div>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateAvailableServicePage;
