import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "https://mcobackend-wc8v.onrender.com/api";

export const apiReducer = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
  tagTypes: [

  ],
});
