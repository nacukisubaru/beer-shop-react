import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';
import { IGetListParams } from '../../types/api.types';
import { ITypePackaging } from './types/type-packaging.types';

export const typePackagingApi = createApi({
    reducerPath: 'typePackagingApi',
    tagTypes: ['TypesPackaging'],
    baseQuery: fetchBaseQuery({baseUrl: host + '/type-packaging'}),
    endpoints: (build) => ({
        getListByProductType: build.query<ITypePackaging[], string>({
            query: (type) => ({
                url: '/getListByProductType/' + type
            })
        }),
        getList: build.query<ITypePackaging[], IGetListParams>({
            query: (params) => ({
                url: '/getListPagination' + params.filter,
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
                url: '/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'TypesPackaging', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'TypesPackaging', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'TypesPackaging', id: 'LIST'}]
        })
    })
});