"use client";

import { Table } from "antd";
import dayjs from "dayjs";
import { useGetBookingHistoryQuery } from "@/redux/api/bookingApi";
import Header from "@/components/ui/Header";

const ServiceHistoryPage = () => {
  const { data: bookingHistory, isLoading } =
    useGetBookingHistoryQuery(undefined);
  // console.log(bookingHistory);

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
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
  ];

  return (
    <div>
      <Header title="Service History" />
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

export default ServiceHistoryPage;
