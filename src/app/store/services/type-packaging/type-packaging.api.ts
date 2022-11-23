import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';
import { ITypePackaging } from './types/type-packaging.types';

export const typePackagingApi = createApi({
    reducerPath: 'typePackagingApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/type-packaging'}),
    endpoints: (build) => ({
        getList: build.query<ITypePackaging[], string>({
            query: (type) => ({
                url: '/getListByProductType/' + type
            })
        })
    })
});