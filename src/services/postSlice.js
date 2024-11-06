
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({ query: () => `post`, keepUnusedDataFor: 0 }),
        // getPost:  builder.query({ query: (id) => `post?id=${id}`, keepUnusedDataFor: 0 }),
        patchPost: builder.mutation({ query: (body) => ({ url: `post`, method: "PATCH", body }) }),

    }),
})


export const { useGetPostsQuery, useGetPostQuery, usePatchPostMutation } = extendedApiSlice
