import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedback";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create ac semester endpoint
    addFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/create-feedback`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // get all ac semesters endpoint
    getFeedbacks: build.query({
      query: () => {
        return {
          url: FEEDBACK_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.feedback],
    }),

    // get single ac semester endpoint
    singleFeedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    // update existing ac semester endpoint
    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // delete existing ac semester endpoint
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useAddFeedbackMutation, // create hook
  useGetFeedbacksQuery, // get all hook
  useSingleFeedbackQuery, // get single hook
  useUpdateFeedbackMutation, // update hook,
  useDeleteFeedbackMutation, // delete hook
} = feedbackApi;
