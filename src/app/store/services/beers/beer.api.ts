import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host, limitPage } from "../../../http/http.request.config";
import { IBeer, IBeerListPaginate } from "./types/beer.type";

interface IGetListParams {
    page: number,
    sort: string,
    order: string,
    filter: string
}

export const beerApi = createApi({
    reducerPath: 'beers',
    baseQuery: fetchBaseQuery({baseUrl: host + '/beers'}),
    endpoints: (build) => ({
        getList: build.query<IBeerListPaginate, IGetListParams>({
            query:(params) => ({
                url:'/getListByFilter/'+params.filter,
                params
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/create/',
                method: 'POST',
                body
            }) 
        }),
    })
});