"use client";

import { Button, Table, message } from "antd";
import { useDeleteUserMutation, useGetUsersQuery } from "@/redux/api/userApi";
import { redirect } from "next/navigation";
import Link from "next/link";
import CustomModal from "@/components/ui/CustomModal";
import { useState } from "react";

const CustomerPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  // console.log(users);

  const [deleteUser] = useDeleteUserMutation();

  const customers = users?.filter((b: any) => b.role === "customer");
  
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....", 0.8);
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

  // console.log(customers);

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
            <Link href={`/admin/customer/${data?.id}`}>
              <Button style={{ marginRight: "7px" }} type="primary">
                {/* <DeleteOutlined /> */}
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                setOpen(true);
                setCustomerId(data?.id);
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
        dataSource={customers}
        pagination={false}
      />
      <CustomModal
        title="Remove Customer"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(customerId)}
      >
        <p className="my-5">Do you want to remove this customer?</p>
      </CustomModal>
    </div>
  );
};

export default CustomerPage;
