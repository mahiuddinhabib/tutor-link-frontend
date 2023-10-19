import { IService, IMeta } from "@/types";
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create ac semester endpoint
    addService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/create-service`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // get all ac semesters endpoint
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),

    // get all ac semesters endpoint
    servicesBySubject: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}/subject`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // get single ac semester endpoint
    singleService: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // update existing ac semester endpoint
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // delete existing ac semester endpoint
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useAddServiceMutation, // create hook
  useServicesQuery, // get all hook
  useSingleServiceQuery, // get single hook
  useUpdateServiceMutation, // update hook,
  useDeleteServiceMutation, // delete hook
  useServicesBySubjectQuery,
} = serviceApi;
