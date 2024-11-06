
import { rishivarSlice } from "../redux/rishivarSlice";

export const extendedApiSlice = rishivarSlice.injectEndpoints({
    endpoints: builder => ({
        getAstros: builder.query({ query: () => `astro`, keepUnusedDataFor: 0 }),
        getAstro: builder.query({ query: (id) => `astro?id=${id}`, keepUnusedDataFor: 0 }),
    }),
})


export const { useGetAstroQuery, useGetAstrosQuery } = extendedApiSlice
