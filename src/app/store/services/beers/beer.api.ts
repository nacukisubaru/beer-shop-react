import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host, limitPage } from "../../../http/http.request.config";
import { IBeer, IBeerListPaginate } from "./types/beer.type";

export const beerApi = createApi({
    reducerPath: 'beers',
    baseQuery: fetchBaseQuery({baseUrl: host + '/beers'}),
    endpoints: (build) => ({
        getList: build.query<IBeerListPaginate, number>({
            query:(page) => ({
                url: '',
                params: {page, limitPage: 20}
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