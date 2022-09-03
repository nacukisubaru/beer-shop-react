import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../../http/http.request.config";

export const snackApi = createApi({
    reducerPath: 'snacks',
    baseQuery: fetchBaseQuery({baseUrl: host + '/snacks'}),
    endpoints: (build) => ({
        addShowSnack: build.mutation({
            query: (id: number) => ({
                url: '/addShow/' + id,
                method: 'GET'
            })
        }),
    })
});