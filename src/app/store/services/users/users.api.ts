import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../api.config';
import { IRegistration } from './types/registration.types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/users'}),
    endpoints: (build) => ({
        registrate: build.mutation<IRegistration, IRegistration>({
            query: (post) => ({
                url: '/registration',
                method: 'POST',
                body: post
            })
        })
    })
})