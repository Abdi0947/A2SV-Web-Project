import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }) =>
  async ({ url, method, data, params }: any) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError: any) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const opportunitiesApi = createApi({
  reducerPath: "opportunities",
  baseQuery: axiosBaseQuery({ baseUrl: "https://akil-backend.onrender.com" }),
  endpoints: (builder) => ({
    // Endpoint to get all opportunities
    getAllOpportunities: builder.query({
      query: () => ({ url: "/opportunities/search", method: "GET" }),
    }),

    //Endpoint to get opportunities by id
    getOpportunityById: builder.query({
      query: (id) => ({ url: `/opportunities/${id}`, method: "GET" }),
    }),
  }),
});

export const { useGetAllOpportunitiesQuery, useGetOpportunityByIdQuery } =
  opportunitiesApi;
