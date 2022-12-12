import { createApi } from "@reduxjs/toolkit/query/react";
import { IGetListParams } from "../../types/api.types";
import reauthBaseQuery from "../api/reauthBaseQuery";
import { ISnack, ISnackListPaginate } from "./types/snacks.types";

export const snackApi = createApi({
    reducerPath: 'snacks',
    tagTypes: ['Snacks'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<ISnackListPaginate[], IGetListParams>({
            query: (params) => ({
                url: '/snacks/getListByFilter/' + params.filter,
                params
            }),
            providesTags: (result: any) =>
                result
                    ? [
                        ...result.rows.map((value: any) => ({ type: 'Snacks', id: value.id })),
                        { type: 'Snacks', id: 'LIST' },
                    ]
                    : [{ type: 'Snacks', id: 'LIST' }],
        }),
        getOne: build.query<ISnack, number>({
            query: (id: number) => ({
                url: '/snacks/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/snacks/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Snacks', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/snacks/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Snacks', id: 'LIST'}]
        }),
        addShowSnack: build.mutation({
            query: (id: number) => ({
                url: '/addShow/' + id,
                method: 'GET'
            })
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/snacks/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Snacks', id: 'LIST'}]
        })
    })
});