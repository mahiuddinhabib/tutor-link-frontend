"use client";

import { Button, Table, message } from "antd";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import Link from "next/link";
import CustomModal from "@/components/ui/CustomModal";
import { useState } from "react";
import Header from "@/components/ui/Header";

const AdminPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  // console.log(users);

  const [deleteUser] = useDeleteUserMutation();

  const admins = users?.filter((b: any) => b.role === "admin");

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....", 0.5);
    try {
      const res = await deleteUser(id);
      // console.log(res);
      if (res) {
        message.success("User Deleted");
        setOpen(false);
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // console.log(admins);

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
            <Link href={`/super_admin/admin/${data?.id}`}>
              <Button style={{ marginRight: "7px" }} type="primary">
                {/* <DeleteOutlined /> */}
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                setOpen(true);
                setAdminId(data?.id);
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
      <Header title="Admins" />
      <Table
        style={{ padding: "10px" }}
        loading={isLoading}
        columns={columns}
        dataSource={admins}
        pagination={false}
      />
      <CustomModal
        title="Remove Admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </CustomModal>
    </div>
  );
};

export default AdminPage;
