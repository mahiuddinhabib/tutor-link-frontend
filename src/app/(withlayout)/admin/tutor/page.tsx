"use client";

import { Button, Table, message, theme } from "antd";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import { useState } from "react";
import CustomModal from "@/components/ui/CustomModal";
import Link from "next/link";
import Header from "@/components/ui/Header";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { useToken } = theme;

const TutorPage = () => {
  const { token } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  const [tutorId, setTutorId] = useState<string>("");
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  //   console.log(users);

  const [deleteUser] = useDeleteUserMutation();

  const tutors = users?.filter((b: any) => b.role === "tutor");

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....", 0.8);
    try {
      const res = await deleteUser(id).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Tutor Deleted");
        setOpen(false);
      } else {
        message.error("Tutor has active service");
        setOpen(false);
      }
    } catch (err: any) {
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
            <Link href={`/admin/tutor/${data?.id}`}>
              <Button style={{ marginRight: "7px" }} type="primary">
                {/* <DeleteOutlined /> */}
                Edit
              </Button>
            </Link>
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
      <Header title="Tutors" />
      <Table
        style={{ padding: "10px" }}
        loading={isLoading}
        columns={columns}
        dataSource={tutors}
        pagination={false}
      />
      <CustomModal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: token.colorWarning, marginRight: "10px" }}
            />
            Remove This Tutor?
          </>
        }
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(tutorId)}
        okText="Delete"
        okType="danger"
      >
        <p className="my-5">Do you want to remove this tutor?</p>
      </CustomModal>
    </div>
  );
};

export default TutorPage;
