"use client";

import { Button, Table, message, theme } from "antd";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import Link from "next/link";
import CustomModal from "@/components/ui/CustomModal";
import { useState } from "react";
import Header from "@/components/ui/Header";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { useToken } = theme;

const AdminPage = () => {
  const { token } = useToken();
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
      <div style={{ overflowX: "auto" }}>
        <Table
          style={{ padding: "10px" }}
          loading={isLoading}
          columns={columns}
          dataSource={admins}
          pagination={false}
        />
      </div>
      <CustomModal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: token.colorWarning, marginRight: "10px" }}
            />
            Remove This Admin?
          </>
        }
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(adminId)}
        okText="Delete"
        okType="danger"
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </CustomModal>
    </div>
  );
};

export default AdminPage;
