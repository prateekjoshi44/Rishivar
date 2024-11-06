
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        postFollow: builder.mutation({ query: (body) => ({ url: `follow`, method: "POST", body }) }),
        deleteFollow: builder.mutation({ query: (body) => ({ url: `follow`, method: "DELETE", body }) }),
    }),
})


export const { usePostFollowMutation, useDeleteFollowMutation } = extendedApiSlice
