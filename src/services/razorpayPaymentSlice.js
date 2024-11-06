
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        postRazorpayPayment: builder.mutation({ query: (body) => ({ url: `razorpayPayment`, method: "POST", body }) }),
        patchRazorpayPayment: builder.mutation({ query: (body) => ({ url: `razorpayPayment`, method: "PATCH", body }) }),
        getrazorpayPayments: builder.query({ query: () => `razorpayPayment`, keepUnusedDataFor: 0 }),
        getrazorpayPayment: builder.query({ query: (id) => `razorpayPayment?id=${id}`, keepUnusedDataFor: 0 }),
    }),
})


export const { usePostRazorpayPaymentMutation, usePatchRazorpayPaymentMutation, useGetrazorpayPaymentQuery, useGetrazorpayPaymentsQuery } = extendedApiSlice
