import { IUser, IMeta } from "@/types";
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all ac semesters endpoint
    getUsers: build.query({
      query: () => {
        return {
          url: USER_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),

    // get single ac semester endpoint
    getSingleUser: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    // update existing ac semester endpoint
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // delete existing ac semester endpoint
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUsersQuery, // get all hook, // get single hook
  useGetSingleUserQuery, // get single hook
  useUpdateUserMutation, // update hook,
  useDeleteUserMutation,
} = userApi;
