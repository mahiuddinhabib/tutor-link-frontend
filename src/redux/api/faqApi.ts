import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/faq";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFAQ: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/create-faq`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // get all ac semesters endpoint
    getFAQs: build.query({
      query: () => {
        return {
          url: FAQ_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.faq],
    }),

    // get single ac semester endpoint
    singleFAQ: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    // update existing ac semester endpoint
    updateFAQ: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // delete existing ac semester endpoint
    deleteFAQ: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useAddFAQMutation, // create hook
  useGetFAQsQuery, // get all hook
  useSingleFAQQuery, // get single hook
  useUpdateFAQMutation, // update hook,
  useDeleteFAQMutation, // delete hook
} = faqApi;
