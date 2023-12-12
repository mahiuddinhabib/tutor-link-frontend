"use client";

import { Table } from "antd";
import dayjs from "dayjs";
import { useGetBookingsQuery } from "@/redux/api/bookingApi";

const BookingPage = () => {
  const { data: booking, isLoading } = useGetBookingsQuery(undefined);

  console.log(booking);

  const columns = [
    {
      title: "Service",
      dataIndex: "availableService",
      render: function (data: any) {
        return <>{data?.service?.title}</>;
      },
    },
    {
      title: "Tutor",
      dataIndex: "availableService",
      render: function (data: any) {
        return <>{data?.service?.tutor?.name}</>;
      },
    },
    {
      title: "Customer Mail",
      dataIndex: "user",
      render: function (data: any) {
        return <>{data?.email}</>;
      },
    },
    {
      title: "Start Time",
      dataIndex: "availableService",
      render: function (data: any) {
        return <>{data?.startTime}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Requested At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
  ];

  return (
    <div>
      <Table
        style={{ padding: "10px" }}
        loading={isLoading}
        columns={columns}
        dataSource={booking}
        pagination={false}
      />
    </div>
  );
};

export default BookingPage;
