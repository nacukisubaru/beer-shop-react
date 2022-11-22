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
    reducerPath: 'beerApi',
    tagTypes: ['Beers'],
    baseQuery: fetchBaseQuery({ baseUrl: host + '/beers' }),
    endpoints: (build) => ({
        getList: build.query<IBeerListPaginate[], IGetListParams>({
            query: (params) => ({
                url: '/getListByFilter/' + params.filter,
                params
            }),
            providesTags: (result: any) =>
                result
                    ? [
                        ...result.rows.map((value: any) => ({ type: 'Beers', id: value.id })),
                        { type: 'Beers', id: 'LIST' },
                    ]
                    : [{ type: 'Beers', id: 'LIST' }],
        }),
        getOne: build.query<IBeer, number>({
            query: (id: number) => ({
                url: '/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Beers', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Beers', id: 'LIST'}]
        }),
    })
});