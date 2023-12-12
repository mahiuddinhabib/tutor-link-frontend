"use client";

import { Button, Table, message } from "antd";
import Link from "next/link";
import CustomModal from "@/components/ui/CustomModal";
import { useState } from "react";
import { useDeleteAvailableServiceMutation, useGetAvailableServicesQuery } from "@/redux/api/availableServiceApi";
import Header from "@/components/ui/Header";

const AvailableServicePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [availableServiceId, setAvailableServiceId] = useState<string>("");

  const { data: availableService, isLoading } = useGetAvailableServicesQuery(undefined);
  
  console.log(availableService);

  const [deleteAvailableService] = useDeleteAvailableServiceMutation();

  /*   const updateHandler = async (id: string) => {
    try {
      console.log(id);
      redirect(`/admin/customer/${id}`)
      } catch (err: any) {
      message.error(err.message);
    }
  };
 */
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....", 0.6);
    try {
      const res = await deleteAvailableService(id).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Available service deleted");
        setOpen(false);
      }
      else{
        message.error("Service has pending request");
        setOpen(false);
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // console.log(customers);

  const columns = [
    {
      title: "Title",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Tutor",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.tutor?.name}</>;
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "Is Booked",
      dataIndex: "isBooked",
      render: function (data: any) {
        return <>{data? "YES":"NO"}</>;
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/availableService/${data?.id}`}>
              <Button style={{ marginRight: "7px" }} type="primary">
                {/* <DeleteOutlined /> */}
                Reschedule
              </Button>
            </Link>
            {!data.isBooked && <Button
              onClick={() => {
                setOpen(true);
                setAvailableServiceId(data?.id);
              }}
              type="primary"
              danger
            >
              {/* <DeleteOutlined /> */}
              Delete
            </Button>}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Header title="Available Services" />
      <Table
        style={{ padding: "10px" }}
        loading={isLoading}
        columns={columns}
        dataSource={availableService}
        pagination={false}
      />
      <CustomModal
        title="Remove Customer"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(availableServiceId)}
      >
        <p className="my-5">Do you want to remove this available service?</p>
      </CustomModal>
    </div>
  );
};

export default AvailableServicePage;
