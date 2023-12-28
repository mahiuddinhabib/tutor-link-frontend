import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const PROFILE_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `${PROFILE_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (updatedData) => {
        const formData = new FormData();
        const { profileImg, ...data } = updatedData;

        formData.append("profileImg", profileImg);
        formData.append("data", JSON.stringify(data));
        // console.log(formData);

        return {
          url: `${PROFILE_URL}`,
          method: "PATCH",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),
    changePassword: build.mutation({
      query: (updatedPassword) => ({
        url: `${PROFILE_URL}/change-password`,
        method: "PATCH",
        data: updatedPassword,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
