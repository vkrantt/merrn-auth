import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://merrn-auth.onrender.com
const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credential:"include"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
