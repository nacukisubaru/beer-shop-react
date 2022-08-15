import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';

import { IBrand } from './types/brand.types';

export const brandApi = createApi({
    reducerPath: 'brandApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/brands'}),
    endpoints: (build) => ({
        brandsList: build.query<IBrand, number>({
            query: (limit) => ({
                url: ''
            })
        })
    })
});
