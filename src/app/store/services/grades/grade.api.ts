import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';

import { IGrade } from './types/grade.type';

export const gradeApi = createApi({
    reducerPath: 'gradeApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/grades'}),
    endpoints: (build) => ({
        getList: build.query<IGrade[], any>({
            query: ({}) => ({
                url: ''
            })
        })
    })
});
