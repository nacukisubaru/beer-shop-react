import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../../http/http.request.config";

export const beerApi = createApi({
    reducerPath: 'beers',
    baseQuery: fetchBaseQuery({baseUrl: host + '/beers'}),
    endpoints: (build) => ({
        addShowBeer: build.mutation({
            query: (id: number) => ({
                url: '/addShow/' + id,
                method: 'GET'
            })
        }),
    })
});