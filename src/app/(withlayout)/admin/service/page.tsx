"use client";
import { Button, message, theme } from "antd";
import { useState } from "react";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import CustomTable from "@/components/ui/CustomTable";
import Link from "next/link";
import CustomModal from "@/components/ui/CustomModal";
import Header from "@/components/ui/Header";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Image from "next/image";
const { useToken } = theme;

const ServicePage = () => {
  const { token } = useToken();
  const query: Record<string, any> = {};
  const [open, setOpen] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const [deleteService] = useDeleteServiceMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useServicesQuery({ ...query });

  const services = data?.services;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....", 0.8);
    try {
      const res = await deleteService(id);
      // console.log(res);
      if (res) {
        message.success("User Deleted");
        setOpen(false);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      render: function (data: any) {
        return (
          <span
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Image
              src={data?.coverImg}
              width={40}
              height={30}
              style={{ borderRadius: "5px" }}
              alt="card image"
            />
            {data?.title}
          </span>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Tutor",
      dataIndex: "tutor",
      render: function (data: any) {
        return <>{data?.name}</>;
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/service/${data?.id}`}>
              <Button style={{ marginRight: "7px" }} type="primary">
                {/* <DeleteOutlined /> */}
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                setOpen(true);
                setServiceId(data?.id);
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

  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
  };

  return (
    <div>
      <Header title="Services" />
      <div style={{ padding: "10px", overflowX: "auto" }}>
        <CustomTable
          loading={isLoading}
          columns={columns}
          dataSource={services}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>

      <CustomModal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: token.colorWarning, marginRight: "10px" }}
            />
            Delete This Service?
          </>
        }
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteHandler(serviceId)}
        okText="Delete"
        okType="danger"
      >
        <p className="my-5">Do you want to delete this service?</p>
      </CustomModal>
    </div>
  );
};

export default ServicePage;
