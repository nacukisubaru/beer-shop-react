import { createApi } from "@reduxjs/toolkit/query/react";
import { IGetListParams } from "../../types/api.types";
import reauthBaseQuery from "../api/reauthBaseQuery";
import { IBeer, IBeerListPaginate } from "./types/beer.type";

export const beerApi = createApi({
    reducerPath: 'beerApi',
    tagTypes: ['Beers'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<IBeerListPaginate[], IGetListParams>({
            query: (params) => ({
                url: '/beers/getListByFilter/' + params.filter,
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
                url: '/beers/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/beers/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Beers', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/beers/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Beers', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/beers/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Beers', id: 'LIST'}]
        })
    })
});