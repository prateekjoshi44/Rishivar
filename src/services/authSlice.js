import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({ url: `auth/signIn`, method: "POST", body }),
    }),
    signUp: builder.mutation({
      query: (body) => ({ url: `auth/signUp`, method: "POST", body }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = extendedApiSlice;
