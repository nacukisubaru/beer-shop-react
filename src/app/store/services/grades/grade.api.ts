import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';
import { IGrade } from './types/grade.type';

export const gradeApi = createApi({
    reducerPath: 'gradeApi',
    tagTypes: ['Grades'],
    baseQuery: fetchBaseQuery({baseUrl: host + '/grades'}),
    endpoints: (build) => ({
        getList: build.query<IGrade[], any>({
            query: (params) => ({
                url: '/getListPagination' + params.filter,
                params
            }),
            providesTags: (result: any) =>
                result
                    ? [
                        ...result.rows.map((value: any) => ({ type: 'Grades', id: value.id })),
                        { type: 'Grades', id: 'LIST' },
                    ]
                    : [{ type: 'Grades', id: 'LIST' }],
        }),
        getOne: build.query<IGrade, number>({
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
            invalidatesTags: [{type: 'Grades', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Grades', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Grades', id: 'LIST'}]
        })
    })
});
