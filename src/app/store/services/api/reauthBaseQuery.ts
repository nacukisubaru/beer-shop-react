import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { host } from "../../../http/http.request.config";

const baseQuery = fetchBaseQuery({ baseUrl: host })

const reauthBaseQuery: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        args.headers = {
            'Authorization': `Bearer ${token}`
        };
    }

    let result = await baseQuery(args, api, extraOptions);
    if (result.error && (result.error?.status === 403 || result.error?.status === 401)) { 
    
        const refresh = await baseQuery({ url: '/users/refresh', credentials: 'include' }, api, extraOptions);
        if (refresh.data) {
            const response: any = refresh.data;
            args.headers = {
                'Authorization': `Bearer ${response.accessToken}`
            };
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("userId", response.user.id);
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
}

export default reauthBaseQuery;