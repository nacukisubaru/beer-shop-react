import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from '../api.config';
import { IBeer } from "./types/beer.type";

export const beerApi = createApi({
    reducerPath: 'beers',
    baseQuery: fetchBaseQuery({baseUrl: host + '/beers'}),
    endpoints: (build) => ({
        fetchAllBeers: build.query<IBeer[], number>({
            query: (page: number = 0) => ({
                url: '',
                params: {
                    page
                }
            })
        })
    })
});