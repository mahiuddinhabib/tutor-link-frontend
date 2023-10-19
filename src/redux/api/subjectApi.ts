import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const SUBJECT_URL = "/subjects";

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create ac semester endpoint
    addSubject: build.mutation({
      query: (data) => ({
        url: `${SUBJECT_URL}/create-subject`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.subject],
    }),

    // get all ac semesters endpoint
    getSubjects: build.query({
      query: () => {
        return {
          url: SUBJECT_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.subject],
    }),

    // get single ac semester endpoint
    singleSubject: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SUBJECT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.subject],
    }),

    // update existing ac semester endpoint
    updateSubject: build.mutation({
      query: (data) => ({
        url: `${SUBJECT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.subject],
    }),

    // delete existing ac semester endpoint
    deleteSubject: build.mutation({
      query: (id) => ({
        url: `${SUBJECT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subject],
    }),
  }),
});

export const {
  useAddSubjectMutation, // create hook
  useGetSubjectsQuery, // get all hook
  useSingleSubjectQuery, // get single hook
  useUpdateSubjectMutation, // update hook,
  useDeleteSubjectMutation, // delete hook
} = subjectApi;
