"use client";

import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import {
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import Header from "@/components/ui/Header";

const BookingRequestPage = () => {
  const { data: booking, isLoading } = useGetBookingsQuery(undefined);

  const requestedBooking = booking?.filter((b: any) => b.status === "pending");

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const updateStatusHandler = async (id: string, status: string) => {
    message.loading("Updating.....");
    try {
      const res = await updateBookingStatus({
        id,
        body: { status },
      });
      if (res) {
        message.success("Status updated");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "availableService",
      render: function (data: any) {
        return <>{data?.service?.title}</>;
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
            <Button
              onClick={() => updateStatusHandler(data?.id, "approved")}
              type="primary"
              style={{ marginRight: "10px" }}
            >
              {/* <DeleteOutlined /> */}
              Approve
            </Button>
            <Button
              onClick={() => updateStatusHandler(data?.id, "rejected")}
              type="primary"
              danger
            >
              {/* <DeleteOutlined /> */}
              Reject
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Header title="Booking Requests" />
      <div style={{ overflowX: "auto", backgroundColor: "white" }}>
        <Table
          style={{ padding: "10px" }}
          loading={isLoading}
          columns={columns}
          dataSource={requestedBooking}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default BookingRequestPage;
