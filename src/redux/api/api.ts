import { apiReducer } from ".";

const allApi = apiReducer.injectEndpoints({
    //examples endpoint for POST and GET MEthods
  endpoints: (builder) => ({
    products: builder.query({
      query: (params) => ({
        url: "/products/",
        method: "GET",
        params: params,
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
export const { useLazyProductsQuery , useLazyMcoExampleGETQuery } = allApi;
