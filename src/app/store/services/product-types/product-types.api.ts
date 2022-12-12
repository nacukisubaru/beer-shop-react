import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../../http/http.request.config";
import { IGetListParams } from "../../types/api.types";
import { IProductType } from "./types/productTypes.type";

export const productTypeApi = createApi({
    reducerPath: 'product-types',
    baseQuery: fetchBaseQuery({baseUrl: host + '/product-types'}),
    endpoints: (build) => ({
        getProductTypes: build.query<IProductType[], any>({
            query: (params) => ({
                url: ''
            }),
        })
    })
});

export const {useGetProductTypesQuery} = productTypeApi;