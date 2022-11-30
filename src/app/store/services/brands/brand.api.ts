import { createApi } from '@reduxjs/toolkit/query/react';
import { IGetListParams } from '../../types/api.types';
import reauthBaseQuery from '../api/reauthBaseQuery';
import { IBrand } from './types/brand.types';

export const brandApi = createApi({
    reducerPath: 'brandApi',
    tagTypes: ['Brands'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getListByProductType: build.query<IBrand[], string>({
            query: (type) => ({
                url: '/brands/getByProductType/' + type
            })
        }),
        getList: build.query<IBrand[], IGetListParams>({
            query: (params) => ({
                url: '/brands/getListPagination/' + params.filter,
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
                url: '/brands/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/brands/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/brands/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/brands/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Brands', id: 'LIST'}]
        })
    })
});
