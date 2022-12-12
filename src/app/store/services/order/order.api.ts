import { createApi } from '@reduxjs/toolkit/query/react';
import reauthBaseQuery from '../api/reauthBaseQuery';
import { IOrderResponse } from './types/order.types';

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
    })
});
