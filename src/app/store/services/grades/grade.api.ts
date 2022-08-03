import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../api.config';
import { IGrade } from './types/grade.type';

export const gradeApi = createApi({
    reducerPath: 'gradeApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/grades'}),
    endpoints: (build) => ({
        gradesList: build.query<IGrade[], number>({
            query: (limit) => ({
                url: ''
            })
        })
    })
});
