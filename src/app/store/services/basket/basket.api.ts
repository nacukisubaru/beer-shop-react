import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from '../api.config';

export const basketApi = createApi({
    reducerPath: 'basket',
    baseQuery: fetchBaseQuery({baseUrl: host + '/basket/'}),
    endpoints: (build) => ({
        createBaket: build.mutation({
            query: (post) => ({
                url: 'addProduct',
                method: 'POST',
                body: post
            })
        })      
    })
});