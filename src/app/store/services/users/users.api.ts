import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../api.config';
import { IAuth, ILogin } from './types/auth.types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/users'}),
    endpoints: (build) => ({
        registrate: build.mutation<IAuth, IAuth>({
            query: (post) => ({
                url: '/registration',
                method: 'POST',
                body: post
            })
        }),
        //Первый тип возращаемых данных, второй тип переданных аргрументов
        login: build.mutation<IAuth, ILogin>({
            query: (post) => ({
                url: '/login',
                method: 'POST',
                body: post
            })
        })
    })
});
