
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        postRating: builder.mutation({ query: (body) => ({ url: `rating`, method: "POST", body }) }),
    }),
})


export const { usePostRatingMutation } = extendedApiSlice
