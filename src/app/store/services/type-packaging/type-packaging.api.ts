import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';
import { IGetListParams } from '../../types/api.types';
import reauthBaseQuery from '../api/reauthBaseQuery';
import { ITypePackaging } from './types/type-packaging.types';

export const typePackagingApi = createApi({
    reducerPath: 'typePackagingApi',
    tagTypes: ['TypesPackaging'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getListByProductType: build.query<ITypePackaging[], string>({
            query: (type) => ({
                url: '/type-packaging/getListByProductType/' + type
            })
        }),
        getList: build.query<ITypePackaging[], IGetListParams>({
            query: (params) => ({
                url: '/type-packaging/getListPagination' + params.filter,
                params
            }),
            providesTags: (result: any) =>
            result
                ? [
                    ...result.rows.map((value: any) => ({ type: 'TypesPackaging', id: value.id })),
                    { type: 'TypesPackaging', id: 'LIST' },
                ]
                : [{ type: 'TypesPackaging', id: 'LIST' }],
        }),
        getOne: build.query<ITypePackaging, number>({
            query: (id: number) => ({
                url: '/type-packaging/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/type-packaging/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'TypesPackaging', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/type-packaging/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'TypesPackaging', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/type-packaging/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'TypesPackaging', id: 'LIST'}]
        })
    })
});