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
    signUp: builder.mutation({
      query: (params) => ({
        url: "/signup/",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),

    login: builder.mutation({
      query: (params) => ({
        url: "/login/",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),

    productDetail: builder.mutation({
      query: (params) => ({
        url: "/description-product/",
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
  }),
});
export const { useLazyProductsQuery, useSignUpMutation, useLoginMutation , useProductDetailMutation} =
  allApi;
