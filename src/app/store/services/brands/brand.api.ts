import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';
import { IGetListParams } from '../../types/api.types';
import { IBrand } from './types/brand.types';

export const brandApi = createApi({
    reducerPath: 'brandApi',
    tagTypes: ['Brands'],
    baseQuery: fetchBaseQuery({baseUrl: host + '/brands'}),
    endpoints: (build) => ({
        getListByProductType: build.query<IBrand[], string>({
            query: (type) => ({
                url: 'getByProductType/' + type
            })
        }),
        getList: build.query<IBrand[], IGetListParams>({
            query: (params) => ({
                url: '/getListPagination/' + params.filter,
                params
            }),
            providesTags: (result: any) =>
            result
                ? [
                    ...result.rows.map((value: any) => ({ type: 'Brands', id: value.id })),
                    { type: 'Brands', id: 'LIST' },
                ]
                : [{ type: 'Brands', id: 'LIST' }],
        }),
        getOne: build.query<IBrand, number>({
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
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        })
    })
});
