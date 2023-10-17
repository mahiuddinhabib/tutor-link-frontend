"use client";

import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import {
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";

const BookingRequestPage = () => {
  const { data: booking, isLoading } = useGetBookingsQuery(undefined);
  console.log(booking);

  const requestedBooking = booking?.filter((b: any) => b.status === "pending");
  console.log(requestedBooking);

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const updateStatusHandler = async (id: string, status: string) => {
    message.loading("Updating.....");
    try {
      //   console.log(data);
      const res = await updateBookingStatus({
        id,
        body: { status },
      });
      if (res) {
        message.success("Status updated");
      }
    } catch (err: any) {
      //   console.error(err.message);
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
              style={{marginRight: "10px"}}
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
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={requestedBooking}
        pagination={false}
      />
    </div>
  );
};

export default BookingRequestPage;
