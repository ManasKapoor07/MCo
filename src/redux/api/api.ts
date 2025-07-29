import { apiReducer } from ".";

const allApi = apiReducer.injectEndpoints({
    //examples endpoint for POST and GET MEthods
  endpoints: (builder) => ({
    mcoExamplePOST: builder.mutation({
      query: (params) => ({
        url: "/emaple/mco",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    mcoExampleGET: builder.query({
      query: (params) => ({
        url: "/emaple/mco",
        method: "GET",
        body: params,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
  }),
});
export const { useMcoExamplePOSTMutation , useLazyMcoExampleGETQuery } = allApi;
