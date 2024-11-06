
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        postLike: builder.mutation({ query: (body) => ({ url: `like`, method: "POST", body }) }),
        deleteLike: builder.mutation({ query: (body) => ({ url: `like`, method: "DELETE", body }) }),
    }),
})


export const { usePostLikeMutation, useDeleteLikeMutation } = extendedApiSlice
