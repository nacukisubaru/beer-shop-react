import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from '../api.config';

export const beerApi = createApi({
    reducerPath: 'beers',
    baseQuery: fetchBaseQuery({baseUrl: host}),
    endpoints: () => ({      
    })
});