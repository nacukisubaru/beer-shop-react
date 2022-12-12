import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../../http/http.request.config";

export const productApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({baseUrl: host + '/products'}),
    endpoints: (build) => ({
        addShow: build.mutation({
            query: (id: number) => ({
                url: '/addShow/' + id,
                method: 'GET'
            })
        }),
    })
});