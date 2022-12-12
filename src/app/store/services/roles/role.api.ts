import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import reauthBaseQuery from "../api/reauthBaseQuery";

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: reauthBaseQuery,
    endpoints: (build) => ({
        checkUserRoleAdmin: build.query<boolean, any>({
            query: (params) => ({
                url: '/roles/hasRoleAdmin'
            }),
        })
    })
});

export const {useCheckUserRoleAdminQuery} = roleApi; 

