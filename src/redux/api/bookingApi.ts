import { IBooking, IMeta } from "@/types";
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create ac semester endpoint
    addBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/create-booking`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // get all ac semesters endpoint
    getBookings: build.query({
      query: () => {
        return {
          url: BOOKING_URL,
          method: "GET",
        };
      },
      //   transformResponse: (response: IBooking[], meta: IMeta) => {
      //     return {
      //       bookings: response,
      //       meta,
      //     };
      //   },
      providesTags: [tagTypes.booking],
    }),

    getBookingHistory: build.query({
      query: () => ({
        url: `${BOOKING_URL}/past-booking`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    // get single ac semester endpoint
    getSingleBooking: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    // update existing ac semester endpoint
    updateBookingStatus: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // update existing ac semester endpoint
    cancelOrCompleteBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "DELETE",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAddBookingMutation, // create hook
  useGetBookingsQuery, // get all hook
  useGetBookingHistoryQuery, // get single hook
  useGetSingleBookingQuery, // get single hook
  useUpdateBookingStatusMutation, // update hook,
  useCancelOrCompleteBookingMutation
} = bookingApi;
