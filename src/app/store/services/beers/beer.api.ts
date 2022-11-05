import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host, limitPage } from "../../../http/http.request.config";

export const beerApi = createApi({
    reducerPath: 'beers',
    baseQuery: fetchBaseQuery({baseUrl: host + '/beers'}),
    endpoints: (build) => ({
        getBeers: build.query({
            query:(page) => ({
                url: '',
                params: {page, limitPage}
            })
        }),
        addBeer: build.mutation({
            query: (body) => ({
                url: '/create/',
                method: 'GET',
                body
            })
        }),
    })
});