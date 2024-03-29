"use client";

import { Button, Select, Table, message, theme } from "antd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import Link from "next/link";
import CustomModal from "@/components/ui/CustomModal";
import { useEffect, useState } from "react";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import { USER_ROLE } from "@/constants/role";
import Header from "@/components/ui/Header";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { useToken } = theme;

const PermissionPage = () => {
  const { token } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  // const [userId, setUserId] = useState<string>("");
  const [idValue, setIdValueId] = useState<Record<"id" | "value", string>>({
    id: "",
    value: "",
  });

  const { data: users, isLoading } = useGetUsersQuery(undefined);
  // console.log(users);

  const [updateUser] = useUpdateUserMutation();

  const withoutSuperAdmin = users?.filter((b: any) => b.role !== "super_admin");

  const roleOptions: SelectOptions[] = [
    {
      label: USER_ROLE.CUSTOMER,
      value: USER_ROLE.CUSTOMER,
    },
    {
      label: USER_ROLE.TUTOR,
      value: USER_ROLE.TUTOR,
    },
    {
      label: USER_ROLE.ADMIN,
      value: USER_ROLE.ADMIN,
    },
    {
      label: USER_ROLE.SUPER_ADMIN,
      value: USER_ROLE.SUPER_ADMIN,
    },
  ];

  const permissionHandler = async () => {
    const { id, value } = idValue;

    try {
      const res = await updateUser({ id, body: { role: value } }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Permission Updated!");
        setOpen(false);
      }
    } catch (err: any) {
      message.error(err.message);
      setOpen(false);
    }
  };

  // console.log(users);

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
      title: "Role",
      render: function (data: any) {
        return (
          <>
            <Select
              // defaultValue={data?.role}
              value={data?.role}
              style={{ width: 120 }}
              onChange={(value) => {
                // handlePermissionChange(value, data?.id);
                setIdValueId({ id: data?.id, value });
                setOpen(true);
              }}
              options={roleOptions}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Header title="Manage Permissions" />
      <div style={{ overflowX: "auto" }}>
        <Table
          style={{ padding: "10px" }}
          loading={isLoading}
          columns={columns}
          dataSource={withoutSuperAdmin}
          pagination={false}
        />
      </div>
      <CustomModal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: token.colorWarning, marginRight: "10px" }}
            />
            Change Role?
          </>
        }
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={permissionHandler}
        showCancelButton={false}
        okText="Yes"
        okType="primary"
      >
        <p className="my-5">Do you want to make him {idValue.value}?</p>
      </CustomModal>
    </div>
  );
};

export default PermissionPage;
