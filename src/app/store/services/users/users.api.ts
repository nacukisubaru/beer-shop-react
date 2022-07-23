import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../api.config';
import { ILogin } from './types/registration.types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/users'}),
    endpoints: (build) => ({
        registrate: build.mutation<ILogin, ILogin>({
            query: (post) => ({
                url: '/registration',
                method: 'POST',
                body: post
            })
        }),
        login: build.mutation<ILogin, ILogin>({
            query: (post) => ({
                url: '/login',
                method: 'POST',
                body: post
            })
        })
    })
})