"use client";

import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import {
  useCancelOrCompleteBookingMutation,
  useGetBookingHistoryQuery,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";

const RunningServicePage = () => {
  const { data: bookings, isLoading } = useGetBookingsQuery(undefined);
  //   console.log(bookings);

  const [cancelOrCompleteBooking] = useCancelOrCompleteBookingMutation();

  const runningBooking = bookings?.filter((b: any) => b.status === "approved");

  //   console.log(runningBooking);

  const completeHandler = async (id: string) => {
    message.loading("Completing.....");
    try {
      //   console.log(data);
      const res = await cancelOrCompleteBooking({
        id,
        body: { status: "completed" },
      });
      if (res) {
        message.success("Booking Completed");
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
      title: "Start Time",
      dataIndex: "availableService",
      render: function (data: any) {
        return <>{data?.startTime}</>;
      },
    },
    {
      title: "Tuition Started",
      dataIndex: "updatedAt",
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
              onClick={() => completeHandler(data?.id)}
              type="primary"
            >
              {/* <DeleteOutlined /> */}
              Complete
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
        dataSource={runningBooking}
        pagination={false}
      />
    </div>
  );
};

export default RunningServicePage;