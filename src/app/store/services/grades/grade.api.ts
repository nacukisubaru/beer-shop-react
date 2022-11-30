import { createApi } from '@reduxjs/toolkit/query/react';
import reauthBaseQuery from '../api/reauthBaseQuery';
import { IGrade } from './types/grade.type';

export const gradeApi = createApi({
    reducerPath: 'gradeApi',
    tagTypes: ['Grades'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        gradesList: build.query<IGrade[], any>({
            query: (params) => ({
                url: ''
            })
        }),
        getList: build.query<IGrade[], any>({
            query: (params) => ({
                url: '/grades/getListPagination' + params.filter,
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
                url: '/grades/getById/'+id
            })
        }),
        add: build.mutation({
            query: (body) => ({
                url: '/grades/create/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Grades', id: 'LIST'}]
        }),
        update: build.mutation({
            query: (body) => ({
                url: '/grades/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Grades', id: 'LIST'}]
        }),
        remove: build.mutation({
            query:(body) => ({
                url: '/grades/remove/' + body.id,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Grades', id: 'LIST'}]
        })
    })
});
