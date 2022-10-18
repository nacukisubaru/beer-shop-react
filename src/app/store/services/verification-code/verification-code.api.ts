import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { host } from '../../../http/http.request.config';
import { IVerificationCodeResponse } from './types/verification.types';

export const verificationCodeApi = createApi({
    reducerPath: 'verificationCodeApi',
    baseQuery: fetchBaseQuery({baseUrl: host + '/verification-code'}),
    endpoints: (build) => ({
        sendCodeByCall: build.query<IVerificationCodeResponse, string>({
            query: (phone) => ({
                url: '/sendCodeByCall',
                params: {
                    phone
                }
            })
        })
    })
});
