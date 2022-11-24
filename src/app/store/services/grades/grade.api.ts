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
            })
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
    })
});
