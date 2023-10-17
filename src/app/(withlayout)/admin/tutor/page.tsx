"use client";

import { Button, Table, message } from "antd";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import { useState } from "react";
import CustomModal from "@/components/ui/CustomModal";

const TutorPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [tutorId, setTutorId] = useState<string>("");
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  //   console.log(users);

  const [deleteUser] = useDeleteUserMutation();

  const tutors = users?.filter((b: any) => b.role === "tutor");

  const updateHandler = async (id: string) => {
    try {
      console.log(id);
      /* const res = await cancelOrCompleteBooking({
        id,
        body: { status: "cancelled" },
      });
      if (res) {
        message.success("Booking Cancelled");
      } */
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....", 0.8);
    try {
      const res = await deleteUser(id).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Tutor Deleted");
        setOpen(false);
      } else {
        message.error("Tutor has active/pending service");
        setOpen(false);
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              onClick={() => updateHandler(data?.id)}
              style={{ marginRight: "7px" }}
              type="primary"
            >
              {/* <DeleteOutlined /> */}
              Edit
            </Button>
            <Button
              onClick={() => {
                setOpen(true);
                setTutorId(data?.id);
              }}
              type="primary"
              danger
            >
              {/* <DeleteOutlined /> */}
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tutors}
        pagination={false}
      />
      <CustomModal
        title="Remove Tutor"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(tutorId)}
      >
        <p className="my-5">Do you want to remove this tutor?</p>
      </CustomModal>
    </div>
  );
};

export default TutorPage;
