import { createApi } from "@reduxjs/toolkit/query/react";
import { IGetListParams } from "../../types/api.types";
import { IFish, IFishListPaginate, IFishType } from "./types/fish.type";
import reauthBaseQuery from "../api/reauthBaseQuery";

export const fishApi = createApi({
    reducerPath: 'fishApi',
    tagTypes: ['Fish'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<IFishListPaginate[], IGetListParams>({
            query: (params) => ({
                url: '/fish/getListByFilter/' + params.filter,
                params
            }),
            providesTags: (result: any) =>
                result
                    ? [
                        ...result.rows.map((value: any) => ({ type: 'Fish', id: value.id })),
                        { type: 'Fish', id: 'LIST' },
                    ]
                    : [{ type: 'Fish', id: 'LIST' }],
        }),
        getOne: build.query<IFish, number>({
            query: (id: number) => ({
                url: '/fish/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/fish/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Fish', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/fish/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Fish', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/fish/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Fish', id: 'LIST'}]
        })
    })
});


export const fishTypesApi = createApi({
    reducerPath: 'fishTypesApi',
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<IFishType[], any>({
            query: () => ({
                url: '/fish-types/getList/'
            }),
        }),  
    })
});