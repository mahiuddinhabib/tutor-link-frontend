"use client";

import { Table } from "antd";
import dayjs from "dayjs";
import {
  useGetBookingHistoryQuery,
  useGetSingleBookingQuery,
} from "@/redux/api/bookingApi";
import Header from "@/components/ui/Header";

const BookingHistoryPage = () => {
  const { data: bookingHistory, isLoading } =
    useGetBookingHistoryQuery(undefined);

  const columns = [
    {
      title: "Service",
      dataIndex: "serviceTitle",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Customer Mail",
      dataIndex: "user",
      render: function (data: any) {
        return <>{data?.email}</>;
      },
    },
    {
      title: "Historied Since",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
  ];

  return (
    <div>
      <Header title="Booking History" />
      <div style={{ overflowX: "auto" }}>
      <Table
        style={{ padding: "10px" }}
        loading={isLoading}
        columns={columns}
        dataSource={bookingHistory}
        pagination={false}
      />
      </div>
    </div>
  );
};

export default BookingHistoryPage;
