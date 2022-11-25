import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../../http/http.request.config";
import { IGetListParams } from "../../types/api.types";
import { ISnack, ISnackListPaginate } from "./types/snacks.types";

export const snackApi = createApi({
    reducerPath: 'snacks',
    tagTypes: ['Snacks'],
    baseQuery: fetchBaseQuery({baseUrl: host + '/snacks'}),
    endpoints: (build) => ({
        getList: build.query<ISnackListPaginate[], IGetListParams>({
            query: (params) => ({
                url: '/getListByFilter/' + params.filter,
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
                url: '/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Snacks', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/update/',
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
                url: '/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Snacks', id: 'LIST'}]
        })
    })
});