"use client";

import { Table } from "antd";
import dayjs from "dayjs";
import { useGetBookingHistoryQuery } from "@/redux/api/bookingApi";

const ServiceHistoryPage = () => {
const {data:bookingHistory, isLoading} = useGetBookingHistoryQuery(undefined);
// console.log(bookingHistory);

  const columns = [
    {
      title: "Service Id",
      dataIndex: "availableServiceId",
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
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={bookingHistory}
        pagination={false}
      />
    </div>
  );
};

export default ServiceHistoryPage;
