import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const AVAILABLE_SERVICE_URL = "/available-services";

export const availableServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create ac semester endpoint
    addAvailableService: build.mutation({
      query: (data) => ({
        url: `${AVAILABLE_SERVICE_URL}/create-available-service`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.availableService],
    }),

    // get all ac semesters endpoint
    getAvailableServices: build.query({
      query: () => {
        return {
          url: AVAILABLE_SERVICE_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.availableService],
    }),

    // get single ac semester endpoint
    singleAvailableService: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${AVAILABLE_SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.availableService],
    }),

    // update existing ac semester endpoint
    updateAvailableService: build.mutation({
      query: (data) => ({
        url: `${AVAILABLE_SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.availableService],
    }),

    // delete existing ac semester endpoint
    deleteAvailableService: build.mutation({
      query: (id) => ({
        url: `${AVAILABLE_SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.availableService],
    }),
  }),
});

export const {
  useAddAvailableServiceMutation, // create hook
  useGetAvailableServicesQuery, // get all hook
  useSingleAvailableServiceQuery, // get single hook
  useUpdateAvailableServiceMutation, // update hook,
  useDeleteAvailableServiceMutation, // delete hook
} = availableServiceApi;
