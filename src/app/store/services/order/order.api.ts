import { createApi } from '@reduxjs/toolkit/query/react';
import reauthBaseQuery from '../api/reauthBaseQuery';
import { IOrderResponse, IOrderStatus } from './types/order.types';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    tagTypes: ['Orders'],
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<IOrderResponse[], any>({
            query: (params) => ({
                url: '/orders/' + params.filter,
                params
            }),
            providesTags: (result: any) =>
                result
                    ? [
                        ...result.rows.map((value: any) => ({ type: 'Orders', id: value.id })),
                        { type: 'Orders', id: 'LIST' },
                    ]
                    : [{ type: 'Orders', id: 'LIST' }],
        }),  
        update: build.mutation({
            query: (body) => ({
                url: '/orders/update/',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Orders', id: 'LIST'}]
        }),  
    })
});

export const orderStatusApi = createApi({
    reducerPath: 'orderStatusApi',
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<IOrderStatus[], any>({
            query: () => ({
                url: '/order-status/getList'
            }),
        }),
        getOne: build.query<IOrderStatus, any>({
            query: (id: number) => ({
                url: '/order-status/getOne/'+ id
            }),
        }),
    })
});

export const orderUserApi = createApi({
    reducerPath: 'orderUserApi',
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        getList: build.query<IOrderResponse[], any>({
            query: (params) => ({
                url: '/orders/user/' + + params.filter,
                params
            }),
        })
    })
});