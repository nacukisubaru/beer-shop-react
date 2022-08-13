import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from '../api.config';
import { IRemoveProduct, IUpdateProduct } from "./types/basket.type";

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
        }),
        removeProduct: build.mutation<boolean, IRemoveProduct>({
            query: (post) => ({
                url: 'removeProduct',
                method: 'POST',
                body: post
            })
        }),
        updateProduct: build.mutation<boolean, IUpdateProduct>({
            query: (post) => ({
                url: 'updProduct',
                method: 'POST',
                body: post
            })
        }),         
    })
});