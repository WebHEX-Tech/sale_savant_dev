import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Menu",
  ],
  endpoints: (build) => ({
    getMenu: build.query({
      query: () => `/menu`,
      providesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenuQuery,
} = api;