"use client";

import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import {
  useCancelOrCompleteBookingMutation,
  useGetBookingHistoryQuery,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import Header from "@/components/ui/Header";

const PendingServicePage = () => {
  const { data: bookings, isLoading } = useGetBookingsQuery(undefined);
  console.log(bookings);

  const [cancelOrCompleteBooking] = useCancelOrCompleteBookingMutation();

  const pendingBooking = bookings?.filter((b: any) => b.status === "pending");

  const cancelHandler = async (id: string) => {
    message.loading("Cancelling.....");
    try {
      //   console.log(data);
      const res = await cancelOrCompleteBooking({
        id,
        body: { status: "cancelled" },
      });
      if (res) {
        message.success("Booking Cancelled");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  console.log(pendingBooking);

  const columns = [
    {
      title: "Service",
      dataIndex: "availableService",
      render: function (data: any) {
        return <>{data?.service?.title}</>;
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
      title: "Requested At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button onClick={() => cancelHandler(data?.id)} type="primary">
              {/* <DeleteOutlined /> */}
              Cancel
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Header title="Pending Services" />
      <Table
      style={{padding:"10px"}}
        loading={isLoading}
        columns={columns}
        dataSource={pendingBooking}
        pagination={false}
      />
    </div>
  );
};

export default PendingServicePage;
